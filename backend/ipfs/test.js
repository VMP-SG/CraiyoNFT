const { IpfsNode } = require("./ipfs-node");

async function main() {
  const ipfs = await IpfsNode.startNode();

  const add = await ipfs.addFiles("test");
  console.log(add);

  const cids = [];
  for (const addition of add) {
    cids.push(addition.cid);
  }

  const read = await ipfs.readFiles(cids);
  console.log(read);
}

main();
