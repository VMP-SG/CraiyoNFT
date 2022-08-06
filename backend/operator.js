const { IpfsNode } = require("./ipfs/IpfsNode");
const fs = require("fs");
const utils = require("./utils");
const path = require("path");

const BACKENDURL = "http://192.168.4.245:8080";

class Operator {
  // useless constructor
  constructor() {
    this.ipfs;
  }

  // used as constant for image directory
  static imageDir = path.join("./backend", "images");

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
      const fileRes = await this.ipfs.addFiles(filepath);
      const fileCid = fileRes.cid;
      console.log(fileCid);

      // prepare metadata with file cid
      const metadata = await this.compileMetadata(fileCid, prompt);

      // stores metadata
      const metadataPath = this.storeFile(metadata, prompt, "metadata");

      // add metadata to ipfs and retrieve first and only cid
      const metaRes = await this.ipfs.addFiles(metadataPath);
      const metaCid = metaRes.cid;
      console.log(`images for prompt: ${prompt} generated`);
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
        "Bypass-Tunnel-Reminder": "go",
      },
      body: JSON.stringify(
        {
          text: prompt,
        },
        null,
        2
      ),
    };

    // actual http call
    try {
      const response = await fetch(BACKENDURL + `/dalle`, content);
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

  // retrieves file from ipfs with cid, and returns json object
  async getImages(cid) {
    // gets file with ipfs node
    const data = await this.ipfs.readFile(cid);

    // adds text together in chunks
    const stringBuilder = [];
    const textDecoder = new TextDecoder();
    for (const chunk of data) {
      stringBuilder.push(textDecoder.decode(chunk));
    }

    // removes first chunk
    stringBuilder.shift();
    const fullString = stringBuilder.join("");

    // returns as json object
    const res = JsonBigint.parse(fullString);
    return res;
  }

  // retrieves metadata of images
  async getMetadata(metaCid) {
    const res = await this.ipfs.readFile(metaCid);
    return res;
  }

  // retrieves preview data for multiple metadata cids
  async getPreviewData(metaCids) {
    const previewData = [];
    for (const metaCid of metaCids) {
    }
  }
}

module.exports = { Operator };
