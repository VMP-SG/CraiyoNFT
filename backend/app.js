const express = require("express");
const cors = require("cors");
const app = express();
const port = parseInt(process.env.PORT) || 8080;
const Jimp = require("jimp");
const axios = require("axios");

let bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

const { Operator } = require("./operator");
let operator;
Operator.init().then((result) => {
  operator = result;
  console.log("Operator running");
});

const awaitTimeout = (delay, reason) =>
  new Promise((resolve, reject) =>
    setTimeout(
      () => (reason === undefined ? resolve() : reject(reason)),
      delay
    )
  );
const wrapPromise = (promise, delay, reason) => Promise.race([promise, awaitTimeout(delay, reason)]);

const logIP = (req) => {
  var ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  console.log(`Incoming request from IP: ${ip}`);
};

app.post("/mintnft", async (req, res) => {
  logIP(req);
  try {
    const prompt = req.body.prompt;
    console.log(`received prompt: ${prompt}`);
    const log = await operator.mintNFT(prompt);
    if (log === undefined) {
      throw new Error("Undefined CID");
    }
    res.send(log.toString());
    console.log(`mintnft request closed with cid of ${log}`);
  } catch (error) {
    res.send("");
    console.error(error);
  }
});

app.post("/getdata", async (req, res) => {
  logIP(req);
  const cid = req.body.cid;
  console.log(`received cid: ${cid}`);
  try {
    const log = await operator.getData(cid);
    res.send(log);
    console.log("getdata request closed");
  } catch (error) {
    console.error(error);
  }
});

app.post("/getdatas", async (req, res) => {
  logIP(req);
  const cids = req.body.cids;
  const data = [];
  for (const cid of cids) {
    console.log(`received cid: ${cid}`);
    try {
      const log = await wrapPromise(operator.getData(cid), 1000, {
        reason: 'Fetch timeout',
      });
      const logWithCid = {cid, ...log};
      data.push(logWithCid);
    } catch (error) {
      console.error(error.reason);
    }
  }
  res.send(data);
  console.log("getdatas request closed");
});

app.post("/getimage", async (req, res) => {
  logIP(req);
  // const backgroundarray = [
  //   "abandoned_resized.jpg",
  //   "shearing_resized.jpg",
  //   "stars_resized.png",
  // ];
  try {
    //   const selectedBGName =
    //     backgroundarray[Math.floor(Math.random() * backgroundarray.length)];
    const cid = req.body.cid;
    console.log(`Received CID: ${cid}`);
    const imagebuffer = await operator.getData(cid);
    const images = imagebuffer.images;
    if (!images) {
      res.send("Please send a correct CID.");
    }
    const background = await Jimp.read(`./assets/stars_resized.png`);
    let position = 590;
    for (let image of images) {
      let img = await Jimp.read(Buffer.from(image, "base64"));
      background.blit(img, position, 1000);
      position += 590;
    }
    const bgimg = await background.quality(60).getBase64Async("image/png");
    res.send({ image: bgimg });
    console.log("getimage request closed");
  } catch (error) {
    console.error(error);
  }
});

app.get("/", (req, res) => {
  res.send("POST to /getdata or /getdatas or /getimage or /mintnft");
});

app.listen(port, () => {
  console.log(`App Running on port ${port}.`);
});
