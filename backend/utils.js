function convertPrompt(string) {
  const res = string.replaceAll(/\s/g, "_");
  return res;
}

module.exports = { convertPrompt };
