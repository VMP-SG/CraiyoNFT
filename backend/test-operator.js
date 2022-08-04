const { Operator } = require("./operator");

async function main() {
  const operator = await Operator.init();
  const prompt = "flying chicken nugget";
  try {
    const log = await operator.generateImages(prompt);
    console.log(log);
  } catch (error) {
    console.log(error);
  }
}

main();
