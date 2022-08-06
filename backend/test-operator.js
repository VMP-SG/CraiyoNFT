const { Operator } = require("./operator");
const utils = require("./utils");

async function main() {
  const operator = await Operator.init();
  try {
    console.log(await mintNFTTest(operator));
    // console.log(await generateTest(operator));
    // console.log(await storeTest(operator));
    // console.log(await addTest(operator));
    // console.log(await addMetaTest(operator));
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
  const cid = "QmepCouyLp6iHu5bAjvcJrWqBHhvF1xPoZpuspA1BSp45e";
  const log = await operator.getImages(cid);
  return log;
}

// tests temp storage of json file
async function storeTest(operator) {
  const prompt = "fake image test";
  const images = {
    generatedImgs: ["asdfasd", "asdfasdf", "aklsdfjlaskd"],
    generatedImgFormat: "png",
  };
  const log = await operator.storeImages(images, prompt);
  return log;
}

// tests adding images to ipfs
async function addTest(operator) {
  const filepath = "backend/images/fake_image_test.json";
  const log = await operator.ipfs.addFiles(filepath);
  const cid = log.cid;
  return cid;
}

// tests adding metadata to ipfs
async function addMetaTest(operator) {
  const filepath = "backend/images/fake_meta_test.json";
  const content = {
    dateTime: "asdfa",
    prompt: "asdfasdf asdf",
    cid: "aslkjdfa",
  };
  const log = await operator.ipfs.addFiles(filepath, content);
  const cid = log.cid;
  return cid;
}

main();
