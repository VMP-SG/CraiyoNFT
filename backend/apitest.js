const fetch = require("node-fetch");

// content object
const content = {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({"prompt": "flying chicken nugget with flies"})
};

const BACKENDURL = "https://protected-tor-25692.herokuapp.com/mintnft"


const httpCall = async() => {
  const response = await fetch(BACKENDURL, content);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.text();
  console.log(data);
}
// actual http call
try {
  httpCall();
} catch (error) {
  console.log(error);
  throw new Error("Timeout");
}
