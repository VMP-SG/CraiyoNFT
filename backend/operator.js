const { IpfsNode } = require("./ipfs/IpfsNode");
const utils = require("./utils");
const path = require("path");

const BACKENDURL = "http://192.168.4.245:8080";

class Operator {
  constructor() {
    this.ipfs;
  }

  static imageDir = path.join(__dirname, "images");

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
      const file = this.storeImages(images);
      const uri = await this.addImages(file);
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
      return response;
    } catch (error) {
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

  async addImages(file) {
    const value = {
      path: file,
      content,
    };
    const add = await this.ipfs.addFiles(value);
  }

  async compileMetadata(uri, prompt) {}

  async addMetadata(metadata) {}

  async mintNFT(metaUri) {}

  async getImages(cids) {}
}

module.exports = { Operator };
