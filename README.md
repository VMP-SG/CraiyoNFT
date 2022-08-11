# CraiyoNFT Documentation

CraiyoNFT was a project inspired by Craiyon. As a bunch of individuals interested in both Defi and Machine Learning, we decided to incorporate both of these elements together, and hence the CraiyoNFT marketplace was born. We are in no way affiliated with the creators of Craiyon.

## CraiyoNFT Webapp

The CraiyoNFT webapp is built using React. Simply install Node.js and node package dependencies to begin.

```bash
yarn install
yarn start
```

The webapp will be running on [http://localhost:3000](http://localhost:3000) by default

## CraiyoNFT Backend

The CraiyoNFT backend is built using express.js and ipfs. Simply install Node.js and node package dependencies to begin.

```bash
yarn install
yarn start
```

The server will be running on [http://localhost:8080](http://localhost:8080) by default

### Endpoints

#### `GET /`

Description:
`Health Check to ensure that the server is up and running`

Request Body:
```
-
```

Response:  
```
POST to /getdata or /getdatas or /getimage or /mintnft
```

#### `POST /getdata`

Description:
`Get NFT Data for a single CID`

Request Body:
```JSON
{
  "cid": "INSERT CID HERE"
}
```

Response:  
```JSON
{
  "dateTime": "Wed, 10 Aug 2022 08:34:44 GMT",
  "prompt": "flying chicken nugget with rice",
  "images": ["6X BASE64 ENCODED IMAGES"]
}
```

#### `POST /getdataS`

Description:
`Get NFT Data for a multiple CIDs`

Request Body:
```JSON
{
  "cids": ["CID1", "CID2", "..."]
}
```

Response:  
```JSON
[
  {
    "dateTime": "...",
    "prompt": "...",
    "images": ["6X BASE64 ENCODED IMAGES"]
  },
  {
    "dateTime": "...",
    "prompt": "...",
    "images": ["6X BASE64 ENCODED IMAGES"]
  }
  ...
]
```
