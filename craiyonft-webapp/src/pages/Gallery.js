import React from "react";
import MainLayout from "../layout/MainLayout";
import useFetchNft from "../hooks/useFetchNft";
// import gallerytest from "../testdata/gallery.json";
import NFTCard from "../components/NFTCard";
import CardSpacing from "../components/spacings/CardSpacing";
import CategoryChip from "../components/CategoryChip";
import CategoryButton from "../components/CategoryButton";
import SortDropdown from "../components/SortDropdown";
import SORT from "../constants/sort";
import { useLocation } from "react-router-dom";
import Cross from "../assets/Cross.svg";
import Spinner from "../components/Spinner";

const Gallery = () => {
  const location = useLocation();
  const [sort, setSort] = React.useState(SORT.DATE_ASC);
  const galleryData = useFetchNft();
  const [categoryList, setCategoryList] = React.useState(
    location.state ? [location.state.category] : []
  );
  const [searchText, setSearchText] = React.useState("");
  const deleteChip = (text) => {
    const filteredCategoryList = categoryList.filter((item) => item !== text);
    setCategoryList(filteredCategoryList);
  };

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
      ? (a, b) => new Date(a.dateTime) - new Date(b.dateTime)
      : sort === SORT.DATE_DES
      ? (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
      : sort === SORT.ALPHABETICAL_ASC
      ? (a, b) => a.prompt.localeCompare(b.prompt)
      : sort === SORT.ALPHABETICAL_DES
      ? (a, b) => b.prompt.localeCompare(a.prompt)
      : // : sort === SORT.ADDRESS_ASC
        // ? (a, b) => b.address.localeCompare(a.address)
        // : sort === SORT.ADDRESS_DES
        // ? (a, b) => b.address.localeCompare(a.address)
        null;
  const gallery = galleryData
    ? galleryData
        .filter((item) =>
          categoryList.every((category) =>
            item.prompt.toLowerCase().includes(category.toLowerCase())
          )
        )
        .sort((a, b) => compare(a, b))
        .map((item, i) => {
          return (
            <CardSpacing key={i}>
              <NFTCard
                cid={item.cid}
                preview={item.images[0]}
                description={item.prompt}
                date={item.dateTime}
                tokenId={item.tokenId}
              />
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
          {gallery === null ? (
            <section className="flex flex-col items-center mt-16 gap-4 mb-10">
              <Spinner className="h-16" />
              <p className="flex flex-col justify-center items-center font-primary ml-2 text-xl font-bold">
                Loading NFTs...
              </p>
            </section>
          ) : gallery.length > 0 ? (
            <section className="grid grid-cols-5">{gallery}</section>
          ) : (
            <section className="flex flex-col items-center mt-16 gap-4 mb-10">
              <img
                src={Cross}
                alt="Cross"
                width="64px"
                className="animate-pulse"
              />
              <p className="flex flex-col justify-center items-center font-primary ml-2 text-xl font-bold">
                There are no NFTs with such specifications.
              </p>
            </section>
          )}
        </main>
      </MainLayout>
    </div>
  );
};

export default Gallery;
