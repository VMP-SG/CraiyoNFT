const path = require("path");

let ipfs;
const IPFSPATH = path.join(__dirname, "jsipfs");
const API = "/ip4/127.0.0.1/tcp/5002";

class IpfsNode {
  constructor() {
    this.init = false;
  }

  static async startNode() {
    const ipfs = new IpfsNode();
    const init = await ipfs.initialize();
    console.log(init);
    return ipfs;
  }

  // starts the node
  async initialize() {
    // dynamic import
    const { create, globSource } = await import("ipfs");
    ipfs = { create, globSource };

    // prepare config for starting node
    const config = {
      Addresses: {
        API,
      },
    };
    const options = {
      repo: IPFSPATH,
      start: true,
      config,
    };
    try {
      this.node = await create(options);
      this.init = true;
      const log = `IPFS node started at API: ${API}`;
      return log;
    } catch (error) {
      console.log(error);
    }
  }

  // add files to IPFS as bytes
  async addFiles(dir) {
    const pathToFiles = path.join(__dirname, "images", dir);
    const logs = [];
    for await (const file of this.node.addAll(
      ipfs.globSource(pathToFiles, "**/*")
    )) {
      logs.push(file);
    }
    return logs;
  }

  // read file from IPFS to bytes
  async readFile(cid) {
    const bufs = [];
    for await (const buf of this.node.get(cid)) {
      bufs.push(buf);
    }
    return bufs;
  }

  // read files from IPFS
  async readFiles(cids) {
    const files = [];
    for (const cid of cids) {
      const file = await this.readFile(cid);
      files.push(file);
    }
    return files;
  }
}

module.exports = { IpfsNode };
