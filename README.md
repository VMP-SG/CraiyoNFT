# CraiyoNFT Documentation

CraiyoNFT was a project inspired by Craiyon. As a bunch of individuals interested in both Defi and Machine Learning, we decided to incorporate both of these elements together, and hence the CraiyoNFT marketplace was born. We are in no way affiliated with the creators of Craiyon.

## CraiyoNFT Webapp

The CraiyoNFT webapp is built using React. Simply install Node.js and node package dependencies to begin.

```bash
cd craiyonft-webapp/
yarn install
yarn start
```

The webapp will be running on [http://localhost:3000](http://localhost:3000) by default

## CraiyoNFT Backend

The CraiyoNFT backend is built using express.js and ipfs. Simply install Node.js and node package dependencies to begin.

```bash
cd backend/
yarn install
yarn start
```

The server will be running on [http://localhost:8080](http://localhost:8080) by default

### IPFS

After generating the images with a Craiyon API, the files are stored using the IPFS system.

When starting the server, an IPFS node will be started and will sync with the network. This node serves as the intermediary for our read and write operations on the file system. An operator is then used to execute methods specific to our usage at CraiyoNFT, for storing of images, token metadata, and retrieval of data.

The IPFS code and methods should, in most circumstances, not be called directly by users unless through our webapp.

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

#### `POST /getdatas`

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

#### `POST /getimage`

Description:
`Get stitched 3D image for single NFT`

Request Body:

```JSON
{
"cid": "INSERT CID HERE"
}
```

Response:

```
Stitched Image
```

#### `POST /mintnft`

Description:
`Mint NFT with 5 word prompt`

Request Body:

```JSON
{
"prompt": "INSERT 5 WORD PROMPT HERE"
}
```

Response:

```
QmSzTPMHYNE9nTHmetWmBn8xvkaTFKWQtRRX3tKKjfHry7
```

## Smart Contract

CraiyoNFT utilises a smart contract for the minting and reading of NFTs. The smart contract is written in SmartPy, and deployed on Tezos Ghostnet.

The smart contract address is [`KT1VDhUkMxipQvg6YmKaom2rikkbTjnWLAtU`](https://better-call.dev/ghostnet/KT1VDhUkMxipQvg6YmKaom2rikkbTjnWLAtU/operations). To read the smart contract in SmartPy, the file can also be found at `backend/smartpy/CraiyoNFT.py`.

### Features

The CraiyoNFT smart contract makes use of the FA2 library for upholding FA2 standard tokens.

The smart contract is capable of minting additional tokens, and querying for all minted tokens with an off-chain view.

## Credits

We used the following resources to aid in the development of our project.
- [Craiyon](https://www.craiyon.com/) for the server
- [Figma](https://www.figma.com/community/file/1111420338365515860) for the UI template
- [CryptoKitties](https://www.cryptokitties.co/) for the use of their images
- [scy6500](https://github.com/scy6500/DALLE-server) for the Dall-e server API
