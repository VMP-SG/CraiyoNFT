const path = require("path");

async function loadIpfs() {
  const { create } = await import("ipfs");
  const jsipfsPath = path.join(__dirname, "jsipfs");
  const options = {
    repo: jsipfsPath,
    start: true,
  };

  const node = await create(options);

  return node;
}

async function test() {
  // Create the IPFS node instance
  const node = await loadIpfs();
  // Your node is now ready to use \o/

  await node.stop();
  // node is now 'offline'
}

test();
