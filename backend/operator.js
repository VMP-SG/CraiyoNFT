const { IpfsNode } = require("./ipfs/IpfsNode");
const fs = require("fs");
const utils = require("./utils");
const path = require("path");
const JsonBigint = require("json-bigint");

const BACKENDURL = "http://192.168.4.245:8080";

class Operator {
  constructor() {
    this.ipfs;
  }

  static imageDir = path.join("./backend", "images");

  static async init() {
    try {
      const operator = new Operator();
      operator.ipfs = await IpfsNode.startNode();
      return operator;
    } catch (error) {
      console.log(error);
    }
  }

  async generateImages(prompt) {
    try {
      const images = await this.callDalleService(prompt);
      const filepath = this.storeImages(images, prompt);
      const logs = await this.ipfs.addFiles(filepath);
      const cid = logs[0].cid;
      const metadata = await this.compileMetadata(cid, prompt);
      console.log(metadata);
      const file = await this.getImages(cid);
      console.log(file);
      const metaUri = await this.addMetadata(metadata);
      const mint = await this.mintNFT(metaUri);
      console.log(mint);
      return `images for prompt: ${prompt} generated`;
    } catch (error) {
      console.log(error);
    }
  }

  async callDalleService(prompt) {
    const content = {
      method: "POST",
      headers: {
        "Bypass-Tunnel-Reminder": "go",
      },
      body: JSON.stringify({
        text: prompt,
      }),
    };

    try {
      const response = await fetch(BACKENDURL + `/dalle`, content);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const res = response.json();
      return res;
    } catch (error) {
      console.log(error);
      throw new Error("Timeout");
    }
  }

  storeImages(images, prompt) {
    const data = JSON.stringify(images, null, 2);
    const filePath = path.join(
      Operator.imageDir,
      `${utils.convertPrompt(prompt)}.json`
    );
    try {
      fs.writeFile(filePath, data, function (error) {
        if (error) {
          console.log(error);
        }
      });

      return filePath;
    } catch (error) {
      console.log(error);
    }
  }

  async compileMetadata(cid, prompt) {
    const words = prompt.split(/\s+/);
    const metadata = {
      prompt,
      firstWord: words[0],
      secondWord: words[1],
      thirdWord: words[2],
      fourthWord: words[3],
      fifthWord: words[4],
      cid: cid.toString(),
    };
    return metadata;
  }

  async addMetadata(metadata) {}

  async mintNFT(metaUri) {}

  async getImages(cid) {
    const data = this.ipfs.readFile(cid);
    const res = data;
    return res;
  }
}

module.exports = { Operator };
