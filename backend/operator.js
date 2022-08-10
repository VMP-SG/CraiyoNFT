const { IpfsNode } = require("./ipfs/IpfsNode");
const fs = require("fs");
const utils = require("./utils");
const path = require("path");
const fetch = require("node-fetch");

const BACKENDURL = "https://main-dalle-server-scy6500.endpoint.ainize.ai/generate";

class Operator {
  // useless constructor
  constructor() {
    this.ipfs;
  }

  // used as constant for image directory
  static imageDir = "./images";

  // static factory method, inits ipfs node
  static async init() {
    try {
      const operator = new Operator();
      operator.ipfs = await IpfsNode.startNode();
      return operator;
    } catch (error) {
      console.log(error);
    }
  }

  // generate images using prompt, adds to ipfs and mints
  async mintNFT(prompt) {
    try {
      // generate images
      const images = await this.generateImages(prompt);

      // store images
      const filepath = this.storeFile(images, prompt, "images");

      // add images to ipfs and retrieve first and only cid
      const fileRes = await this.ipfs.addFile(filepath);
      const fileCid = fileRes.cid;
      // console.log(fileCid);

      // prepare metadata with file cid
      const metadata = await this.compileMetadata(fileCid, prompt);

      // stores metadata
      const metadataPath = this.storeFile(metadata, prompt, "metadata");

      // add metadata to ipfs and retrieve first and only cid
      const metaRes = await this.ipfs.addFile(metadataPath);
      const metaCid = metaRes.cid;
      // console.log(metaCid);
      console.log(`images for prompt: ${prompt} generated`);

      // removes temp files in an async call
      this.removeTempFiles(prompt);

      return metaCid;
    } catch (error) {
      console.log(error);
    }
  }

  // creates images using dall-e service
  async generateImages(prompt) {
    // content object
    const content = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"text":prompt, "num_images":6})
    };

    // actual http call
    try {
      const response = await fetch(BACKENDURL, content);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const images = response.json();
      return images;
    } catch (error) {
      console.log(error);
      throw new Error("Timeout");
    }
  }

  // stores file temporarily as a json file in img dir
  storeFile(content, prompt, type) {
    // converts json to string
    const data = JSON.stringify(content, null, 2);
    let filename;
    if (type === "images") {
      filename = `${utils.convertPrompt(prompt)}.json`;
    } else if (type === "metadata") {
      filename = `${utils.convertPrompt(prompt)}_meta.json`;
    } else {
      throw new Error(`Invalid type of data`);
    }

    // relative path for use in ipfs
    const relativePath = path.join(Operator.imageDir, filename);

    // absolute path for current use in writing file
    const absolutePath = path.join(__dirname, "images", filename);

    try {
      fs.writeFile(absolutePath, data, function (error) {
        if (error) {
          console.log(error);
        }
      });

      return relativePath;
    } catch (error) {
      console.log(error);
    }
  }

  // creates metadata of date time, and prompt
  async compileMetadata(fileCid, prompt) {
    const dateTime = utils.getDateTime();
    const metadata = {
      dateTime,
      prompt,
      cid: fileCid.toString(),
    };
    return metadata;
  }

  // removes temp files created for mint
  async removeTempFiles(prompt) {
    const convertedPrompt = utils.convertPrompt(prompt);
    const filename = `${convertedPrompt}.json`;
    const metadataName = `${convertedPrompt}_meta.json`;
    const filepath = path.join(Operator.imageDir, filename);
    const metadataPath = path.join(Operator.imageDir, metadataName);
    const callback = (error) => {
      if (error) {
        console.log(error);
      }
    };
    fs.unlink(filepath, callback);
    fs.unlink(metadataPath, callback);
  }

  // retrieves file from ipfs with cid, and returns json object
  async getData(metaCid) {
    const metadata = await this.ipfs.readFile(metaCid);
    const imagesCid = metadata.cid;
    const images = await this.ipfs.readFile(imagesCid);
    const result = {
      dateTime: metadata.dateTime,
      prompt: metadata.prompt,
      images,
    };
    return result;
  }
}

module.exports = { Operator };
