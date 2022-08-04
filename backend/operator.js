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
      console.log(images);
      const filepath = this.storeImages(images, prompt);
      console.log(filepath);
      const logs = await this.ipfs.addFiles(filepath);
      const cid = logs[0].cid;
      console.log(cid);
      const metadata = await this.compileMetadata(uri, prompt);
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
      const res = JsonBigint.parse(JSON.stringify(response.text()));
      return res;
    } catch (error) {
      console.log(error);
      throw new Error("Timeout");
    }
  }

  storeImages(images, prompt) {
    const filePath = path.join(
      Operator.imageDir,
      `${utils.convertPrompt(prompt)}.json`
    );
    try {
      fs.writeFile(filePath, images, function (error) {
        if (error) {
          console.log(error);
        }
      });

      return filePath;
    } catch (error) {
      console.log(error);
    }
  }

  async compileMetadata(uri, prompt) {}

  async addMetadata(metadata) {}

  async mintNFT(metaUri) {}

  async getImages(cids) {}
}

module.exports = { Operator };
