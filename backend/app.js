const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
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
});

app.post("/mintnft", (req, res) => {
  const prompt = req.body.prompt;
  console.log(`received prompt: ${prompt}`);
  operator
    .mintNFT(prompt)
    .then((log) => {
      console.log(log);
      res.send(log.toString());
    })
    .catch((error) => res.send(error));
});

app.post("/getdata", (req, res) => {
  const cid = req.body.cid;
  console.log(`received cid: ${cid}`);
  operator
    .getData(cid)
    .then((log) => {
      console.log(log);
      res.send(log);
    })
    .catch((error) => res.send(error));
});

app.post("/getimage", async (req, res) => {
  const backgroundarray = [
    "abandoned_resized.jpg",
    "shearing_resized.jpg",
    "stars_resized.png",
  ];
  const selectedBGName =
    backgroundarray[Math.floor(Math.random() * backgroundarray.length)];
  const cid = req.body.cid;
  const imagebuffer = await axios.post(
    "https://craiyonft.nghochi.xyz/getdata",
    {
      cid: `${cid}`,
    }
  );
  const images = imagebuffer.data.images;
  const background = await Jimp.read(`./assets/${selectedBGName}`);
  let position = 590;
  for (let image of images) {
    let img = await Jimp.read(Buffer.from(image, "base64"));
    background.blit(img, position, 1000);
    position += 590;
  }
  background.write("blit.png", res.download("blit.png"));
});

app.get("/", (req, res) => {
  res.send("POST to /getdata or /mintnft");
});

app.listen(port, () => {
  console.log(`App Running on port ${port}.`);
});
