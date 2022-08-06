import React from "react";
import MainLayout from "../layout/MainLayout";
import gallerytest from "../testdata/gallery.json";
import NFTCard from "../components/NFTCard";
import CardSpacing from "../components/spacings/CardSpacing";
import CategoryChip from "../components/CategoryChip";
import CategoryButton from "../components/CategoryButton";
import SortDropdown from "../components/SortDropdown";
import SORT from "../constants/sort";

const Gallery = () => {
  const [sort, setSort] = React.useState(SORT.DATE_ASC);
  const [categoryList, setCategoryList] = React.useState([]);
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
      ? (a, b) => a.cindex > b.cindex
      : sort === SORT.DATE_DES
      ? (a, b) => a.cindex < b.cindex
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
          categoryList.every((category) => item.description.includes(category))
        )
        .sort((a, b) => compare(a, b))
        .map((item, i) => {
          return (
            <CardSpacing key={item.cindex}>
              <NFTCard
                name={item.name}
                description={item.description}
                id={item.cindex}
                preview={item.preview}
                address={item.address}
              />
            </CardSpacing>
          );
        })
    : null;
  return (
    <div>
      {/*  text-[42.67px] leading-[58.28px] */}
      <MainLayout>
        <main className="flex flex-col justify-center items-center font-primary">
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
