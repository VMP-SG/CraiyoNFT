const { Operator } = require("./operator");
const utils = require("./utils");

async function main() {
  const operator = await Operator.init();
  const prompt = "flying chicken nugget with rice";
  const cid = "QmepCouyLp6iHu5bAjvcJrWqBHhvF1xPoZpuspA1BSp45e";
  try {
    // const log = await operator.generateImages(prompt);
    const temp = utils.convertCid(cid);
    const log = await operator.getImages(temp);
    console.log(log);
  } catch (error) {
    console.log(error);
  }
}

main();
