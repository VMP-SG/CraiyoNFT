import React, { useMemo, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import gallerytest from "../testdata/gallery.json";
import NFTCard from "../components/NFTCard";
import CardSpacing from "../components/spacings/CardSpacing";
import CategoryChip from "../components/CategoryChip";
import CategoryButton from "../components/CategoryButton";
import SortDropdown from "../components/SortDropdown";
import SORT from "../constants/sort";
import { useLocation } from "react-router-dom";
import RPC, { CONTRACTADDRESS, BACKENDADDRESS } from "../constants/tezos";
import { TezosToolkit } from "@taquito/taquito";
import { bytes2Char } from "@taquito/utils";

const Gallery = () => {
  const location = useLocation();
  const [sort, setSort] = React.useState(SORT.DATE_ASC);
  const [categoryList, setCategoryList] = React.useState(
    location.state ? [location.state.category] : []
  );
  const [searchText, setSearchText] = React.useState("");
  const deleteChip = (text) => {
    const filteredCategoryList = categoryList.filter((item) => item !== text);
    setCategoryList(filteredCategoryList);
  };

  const Tezos = useMemo(() => {
    return new TezosToolkit(RPC.GHOSTNET);
  }, []);

  useEffect(() => {
    const contractInteraction = async() => {
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
      console.log(nftData);

    }
    contractInteraction();
  },[Tezos]);

  const categoryChipList = categoryList.map((category, index) => {
    return (
      <CategoryChip
        key={index}
        text={category}
        className={"text-[10.67px] px-3 h-[29.33px] m-2"}
        onClose={deleteChip}
      />
    );
  });
  const compare =
    sort === SORT.DATE_ASC
      ? (a, b) => a.cindex - b.cindex
      : sort === SORT.DATE_DES
      ? (a, b) => b.cindex - a.cindex
      : sort === SORT.ALPHABETICAL_ASC
      ? (a, b) => a.name.localeCompare(b.name)
      : sort === SORT.ALPHABETICAL_DES
      ? (a, b) => b.name.localeCompare(a.name)
      : sort === SORT.ADDRESS_ASC
      ? (a, b) => b.address.localeCompare(a.address)
      : sort === SORT.ADDRESS_DES
      ? (a, b) => b.address.localeCompare(a.address)
      : null;
  const gallery = gallerytest
    ? gallerytest.data["collection"]
        .filter((item) =>
          categoryList.every((category) =>
            item.description.toLowerCase().includes(category.toLowerCase())
          )
        )
        .sort((a, b) => compare(a, b))
        .map((item, i) => {
          return (
            <CardSpacing key={item.cindex}>
              <NFTCard cid={item.cindex} />
            </CardSpacing>
          );
        })
    : null;
  return (
    <div>
      {/*  text-[42.67px] leading-[58.28px] */}
      <MainLayout>
        <main className="flex flex-col justify-center items-center font-primary w-[1169.83px]">
          <div className="font-extrabold text-[24px] text-blue-dark font-primary mt-10 ml-2 self-start relative">
            <div className="absolute left-0 bottom-0 w-[50px] h-[12.67px] bg-[#FFB8DA] z-[-1]" />
            <p>Discover more NFTs</p>
          </div>
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center">
              <CategoryButton
                text="Category"
                className="text-[10.67px] h-[29.33px] px-3 m-2"
                categoryList={categoryList}
                setCategoryList={setCategoryList}
                searchText={searchText}
                setSearchText={setSearchText}
              />
              {categoryChipList}
            </div>
            <SortDropdown text={`Sort by: ${sort}`} setSort={setSort} />
          </div>
          <div className="grid grid-cols-5">
            {gallery.length > 0 ? (
              gallery
            ) : (
              <p className="flex flex-col justify-center items-center font-primary ml-2">
                There are no NFTs with such specifications.
              </p>
            )}
          </div>
        </main>
      </MainLayout>
    </div>
  );
};

export default Gallery;
