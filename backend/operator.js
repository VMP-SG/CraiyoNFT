const { IpfsNode } = require("./ipfs/IpfsNode");

const BACKENDURL = "http://192.168.4.245:8080";

class Operator {
  constructor() {
    this.ipfs;
  }

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
      const response = await this.callDalleService(prompt);
      const images = response;
      const files = await this.storeImages(images);
      const uri = await this.addImages(files);
      const metadata = await this.compileMetadata(uri);
      const metaUri = await this.addMetadata(metadata);
      const mint = await this.mintNFT(metaUri);
      console.log(mint);
    } catch (error) {
      console.log(error);
    }
    return `images for prompt: ${prompt} generated`;
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
    } catch (error) {
      throw new Error("Timeout");
    }

    return {
      serverResponse: response,
    };
  }

  async storeImages(images) {}

  async addImages(files) {}

  async compileMetadata(uri) {}

  async mintNFT(metaUri) {}

  async getImages(cids) {}
}

module.exports = { Operator };
