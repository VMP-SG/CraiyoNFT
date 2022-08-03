const path = require("path");

async function loadIpfs() {
  const { create } = await import("ipfs");
  const jsipfsPath = path.join(__dirname, "jsipfs");
  const API = "/ip4/127.0.0.1/tcp/5002";
  const config = {
    Addresses: {
      API,
    },
  };
  const options = {
    repo: jsipfsPath,
    start: true,
    config,
  };

  const node = await create(options);

  return node;
}

async function test() {
  const node = await loadIpfs();

  const { globSource } = await import("ipfs");
  const pathToFiles = path.join(__dirname, "test");
  // const files = await node.addAll(globSource(pathToFiles, "**/*"));
  // const file = await files.next();
  // console.log(file);

  for await (const file of node.addAll(globSource(pathToFiles, "**/*"))) {
    console.log(file);
  }

  const cid = "QmSdNDti9QPLMCfQbjN6yyUg9xKyEY41baUzpBe8vBcCvn";

  for await (const buf of node.get(cid)) {
    console.log(buf);
  }

  await node.stop();
}

test();
