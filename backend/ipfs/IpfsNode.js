const path = require("path");
const JsonBigint = require("json-bigint");

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
    const { create, globSource, CID } = await import("ipfs");
    ipfs = { create, globSource, CID };

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
  async addFiles(filepath) {
    const logs = [];
    for await (const file of this.node.addAll(
      ipfs.globSource(filepath, "**/*")
    )) {
      logs.push(file);
    }
    return logs[0];
  }

  // read file from IPFS to bytes
  async readFile(cid) {
    const stringBuilder = [];
    const textDecoder = new TextDecoder();
    for await (const chunk of this.node.get(cid)) {
      stringBuilder.push(textDecoder.decode(chunk));
    }

    const fullString = stringBuilder[1];

    // returns as json object
    const res = JsonBigint.parse(fullString);
    return res;
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
