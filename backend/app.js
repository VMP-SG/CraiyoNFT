const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors({origin: '*'}));

const { Operator } = require("./operator");
let operator;
Operator.init().then((result) => {
  operator = result;
});

app.post("/mintnft", (req, res) => {
  const prompt = req.body.prompt;
  console.log(`received prompt: ${prompt}`);
  operator.mintNFT(prompt).then((log) => {
    console.log(log);
    res.send(log.toString());
  }).catch((error) => res.send(error));
});

app.post("/getdata", (req, res) => {
  const cid = req.body.cid;
  console.log(`received cid: ${cid}`);
  operator.getData(cid).then((log) => {
    console.log(log);
    res.send(log)
  }).catch((error) => res.send(error));
});

app.get("/", (req, res) => {
  res.send("POST to /getData or /mintnft");
});

app.listen(port, () => {
  console.log(`App Running on port ${port}.`);
});
