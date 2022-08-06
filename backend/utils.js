const CID = require("cids");

function convertPrompt(string) {
  const res = string.replaceAll(/\s/g, "_");
  return res;
}

function getDateTime() {
  const today = new Date();
  const dateTime = today.toUTCString();
  return dateTime;
}

module.exports = { convertPrompt, getDateTime };
