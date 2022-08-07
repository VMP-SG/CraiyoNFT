const { Operator } = require("./operator");
const utils = require("./utils");

async function main() {
  const operator = await Operator.init();
  try {
    // console.log(await mintNFTTest(operator));
    // console.log(await generateTest(operator));
    // console.log(await storeTest(operator));
    // console.log(await storeMetaTest(operator));
    // console.log(await addTest(operator));
    // console.log(await addMetaTest(operator));
    // console.log(await readTest(operator));
    console.log(await removeTest(operator));
  } catch (error) {
    console.log(error);
  }
}

// overall test for minting the NFT
async function mintNFTTest(operator) {
  const prompt = "flying chicken nugget with rice";
  const log = await operator.mintNFT(prompt);
  return log;
}

// tests generating images
async function generateTest(operator) {
  const prompt = "flying chicken nugget with rice";
  const log = await operator.generateImages(prompt);
  return log;
}

// tests retrieval of file from ipfs
async function readTest(operator) {
  // const cid = "QmU61ij6yM61SCz6r92TeKqtnkep5eUmQ53aid7FWuVo14"; // images
  const cid = "QmZF1BGBkstx2Qm7euprZB6nsQjM31KP9pVg4ZoWRgVdcY"; // meta
  const log = await operator.getData(cid);
  return log;
}

// tests temp storage of json file
async function storeTest(operator) {
  const prompt = "fake image test";
  const images = {
    generatedImgs: ["asdfasd", "asdfasdf", "aklsdfjlaskd"],
    generatedImgFormat: "png",
  };
  const log = await operator.storeFile(images, prompt, "images");
  return log;
}

// tests temp storage of json file
async function storeMetaTest(operator) {
  const prompt = "fake image test";
  const metadata = {
    dateTime: "asldkfjalsdkfj",
    prompt,
    cid: "QmU61ij6yM61SCz6r92TeKqtnkep5eUmQ53aid7FWuVo14",
  };
  const log = await operator.storeFile(metadata, prompt, "metadata");
  return log;
}

// tests adding images to ipfs
async function addTest(operator) {
  const filepath = "backend/images/fake_image_test.json";
  const log = await operator.ipfs.addFile(filepath);
  const cid = log.cid;
  return cid;
}

// tests adding metadata to ipfs
async function addMetaTest(operator) {
  const filepath = "backend/images/fake_image_test_meta.json";
  const log = await operator.ipfs.addFile(filepath);
  const cid = log.cid;
  return cid;
}

// tests removal of temp files
async function removeTest(operator) {
  const prompt = "flying chicken nugget with rice";
  operator.removeTempFiles(prompt);
}

main();
