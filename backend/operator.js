const { IpfsNode } = require("./ipfs/IpfsNode");

let ipfs;

async function init() {
  try {
    ipfs = await IpfsNode.startNode();
  } catch (error) {
    console.log(error);
  }
}

async function checkInit() {
  if (!ipfs) {
    await init();
  }
}

async function generateImages(prompt) {}

async function getImages(cids) {}
