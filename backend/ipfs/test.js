const { IpfsNode } = require("./IpfsNode");

async function main() {
  const ipfs = await IpfsNode.startNode();

  const add = await ipfs.addFiles("/Users/kevin/.bash_profile");
  const cids = [];
  for (const addition of add) {
    console.log(addition);
    cids.push(addition.cid);
  }

  const read = await ipfs.readFiles(cids);
  console.log(read);
}

main();
