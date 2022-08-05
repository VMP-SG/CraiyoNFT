const CID = require("cids");

function convertPrompt(string) {
  const res = string.replaceAll(/\s/g, "_");
  return res;
}

function convertCid(encoding) {
  const res = new CID(encoding);
  return res;
}

module.exports = { convertPrompt, convertCid };
