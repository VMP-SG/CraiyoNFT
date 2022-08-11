import { useEffect, useMemo, useState } from "react";
import RPC, { CONTRACTADDRESS, BACKENDADDRESS, localStorageKeys } from "../constants/tezos";
import { TezosToolkit } from "@taquito/taquito";
import { bytes2Char } from "@taquito/utils";

const useFetchNft = (address = undefined) => {
  const [galleryData, setGalleryData] = useState(undefined);
  const Tezos = useMemo(() => {
    return new TezosToolkit(RPC.GHOSTNET);
  }, []);

  useEffect(() => {
    const queryAll = async() => {
      // calling the smart contract
      const contract = await Tezos.wallet.at(CONTRACTADDRESS);
      const contractStorage = await contract.storage();
      const nftCount = await contractStorage.last_token_id.toNumber();
      const nftDataArg = [...Array(nftCount).keys()];
      const nftMetaData = await contractStorage.token_metadata.getMultipleValues(nftDataArg);
      const nftArray = Array.from(nftMetaData.valueMap.values());
      const cidArray = [];
      nftArray.forEach((nft) => {
        const nftCIDBytes = nft.token_info.valueMap.get("\"cid\"");
        cidArray.push(bytes2Char(nftCIDBytes));
      });
      // checking with localstorage
      let rawCache = localStorage.getItem(localStorageKeys.nftData);
      rawCache = rawCache === "undefined" ? "[]" : rawCache;
      let cachedNftData = JSON.parse(localStorage.getItem(rawCache));
      cachedNftData = cachedNftData === null ? [] : cachedNftData;
      const filteredArray = cidArray.filter((cid) => !cachedNftData.some((cachednft) => cachednft.cid === cid));
      let combinedNftData = cachedNftData;
      if (filteredArray.length > 0) {
        // getting prompts from backend server
        const content = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({cids: cidArray})
        };
        const nftDataResponse = await fetch(BACKENDADDRESS + "/getdatas", content);
        const nftData = await nftDataResponse.json();
        combinedNftData = [...cachedNftData, ...nftData];
        localStorage.setItem(localStorageKeys.nftData, JSON.stringify(combinedNftData));
      }
      setGalleryData(combinedNftData);
    }

    const queryAddress = async () => {
      // calling smart contract and seeing which cids belong to address
      const contract = await Tezos.wallet.at(CONTRACTADDRESS);
      const contractStorage = await contract.storage();
      const nftCount = await contractStorage.last_token_id.toNumber();
      const nftDataArg = [...Array(nftCount).keys()];
      const addressData = await contractStorage.ledger.getMultipleValues(nftDataArg);
      const addressMap = addressData.valueMap;
      const keys = Array.from(addressMap.keys());
      const tokenIds = [];
      for (const key of keys) {
        if (addressMap.get(key) === address) {
          tokenIds.push(key);
        }
      }
      const nftMetaData = await contractStorage.token_metadata.getMultipleValues(tokenIds);
      const nftArray = Array.from(nftMetaData.valueMap.values());
      const cidArray = [];
      nftArray.forEach((nft) => {
        const nftCIDBytes = nft.token_info.valueMap.get("\"cid\"");
        cidArray.push(bytes2Char(nftCIDBytes));
      });

      let rawCache = localStorage.getItem(localStorageKeys.nftData);
      rawCache = rawCache === "undefined" ? "[]" : rawCache;
      let cachedNftData = JSON.parse(rawCache);
      cachedNftData = cachedNftData === null ? [] : cachedNftData;
      const cachedUserNftData = cachedNftData.filter((cachedNft) => cidArray.includes(cachedNft.cid));
      
      const filteredArray = cidArray.filter((cid) => !cachedNftData.some((cachednft) => cachednft.cid === cid));

      let combinedNftData = cachedUserNftData;
      if (filteredArray.length > 0) {
        // getting prompts from backend server
        const content = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({cids: cidArray})
        };
        const nftDataResponse = await fetch(BACKENDADDRESS + "/getdatas", content);
        const nftData = await nftDataResponse.json();
        combinedNftData = [...cachedUserNftData, ...nftData];
        localStorage.setItem(localStorageKeys.nftData, JSON.stringify());
      }
      console.log(combinedNftData);
      setGalleryData(combinedNftData);
    }

    if (address) {
      queryAddress();
    } else {
      queryAll();
    }
  },[Tezos, address]);

  return galleryData;
}

export default useFetchNft;
