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
      const idArray = [];
      nftArray.forEach((nft, i) => {
        if (nft !== undefined) {
          const nftCIDBytes = nft.token_info.valueMap.get("\"cid\"");
          idArray.push({cid: bytes2Char(nftCIDBytes), tokenId: i});
        }
      });

      // checking with localstorage
      let rawCache = localStorage.getItem(localStorageKeys.nftData);
      rawCache = rawCache === "undefined" ? "[]" : rawCache;
      let cachedNftData = JSON.parse(rawCache);
      cachedNftData = cachedNftData === null ? [] : cachedNftData;
      const filteredArray = idArray.filter((id) => !cachedNftData.some((cachednft) => cachednft.cid === id.cid));
      let combinedNftData = cachedNftData;

      if (filteredArray.length > 0) {
        // getting prompts from backend server
        const cidArray = filteredArray.map((id) => id.cid);
        const content = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({cids: cidArray})
        };
        const nftDataResponse = await fetch(BACKENDADDRESS + "/getdatas", content);
        const nftData = await nftDataResponse.json();
        const nftDataWithToken = nftData.map((nft, index) => {return {...nft, tokenId: filteredArray[index].tokenId}})
        combinedNftData = [...cachedNftData, ...nftDataWithToken];
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
      const idArray = [];
      nftArray.forEach((nft, i) => {
        if (nft !== undefined) {
          const nftCIDBytes = nft.token_info.valueMap.get("\"cid\"");
          idArray.push({cid: bytes2Char(nftCIDBytes), tokenId: i});
        }
      });


      let rawCache = localStorage.getItem(localStorageKeys.nftData);
      rawCache = rawCache === "undefined" ? "[]" : rawCache;
      let cachedNftData = JSON.parse(rawCache);
      cachedNftData = cachedNftData === null ? [] : cachedNftData;
      const cachedUserNftData = cachedNftData.filter((cachedNft) => idArray.some((id) => cachedNft.cid === id.cid));
      const filteredArray = idArray.filter((id) => !cachedNftData.some((cachednft) => cachednft.cid === id.cid));

      let combinedNftData = cachedUserNftData;
      if (filteredArray.length > 0) {
        // getting prompts from backend server
        const cidArray = filteredArray.map((id) => id.cid);
        const content = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({cids: cidArray})
        };
        const nftDataResponse = await fetch(BACKENDADDRESS + "/getdatas", content);
        const nftData = await nftDataResponse.json();
        const nftDataWithToken = nftData.map((nft, index) => {return {...nft, tokenId: filteredArray[index].tokenId}})
        combinedNftData = [...cachedNftData, ...nftDataWithToken];
        localStorage.setItem(localStorageKeys.nftData, JSON.stringify(combinedNftData));
      }
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
