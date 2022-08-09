import { Navigate, useSearchParams } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import { isTezosAddress } from "../utils/address";
import Cover from "../assets/ProfileCover.png";
import ProfileAvatar from "../components/ProfileAvatar";
import VerifiedCheck from "../assets/VerifiedCheck.svg";
import NFTCard from "../components/NFTCard";
import Lamb from "../assets/placeholders/Lamb.svg";
import profiletest from "../testdata/profile.json";
import { useState } from "react";
import CategoryButton from "../components/CategoryButton";
import SortDropdown from "../components/SortDropdown";
import SORT from "../constants/sort";
import CategoryChip from "../components/CategoryChip";
import CardSpacing from "../components/spacings/CardSpacing";

const Profile = () => {
  const [sort, setSort] = useState(SORT.DATE_ASC);
  const [categoryList, setCategoryList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchParams] = useSearchParams();
  const address = searchParams.get("address");
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
  const data = profiletest
    ? profiletest.data
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

  if (isTezosAddress(address)) {
    return (
      <div>
        <MainLayout>
          <main className="flex flex-col justify-center items-center font-primary text-[42.67px] leading-[58.28px]">
            <img src={Cover} alt="Cover" />
            <ProfileAvatar className="top-20" />
            <section className="mt-[40px] text-[18.67px] font-semibold leading-[25.5px]">
              <p>{address}</p>
              <p className="mt-[4px] flex leading-[16.39px] justify-center text-[12px]">
                <span className="text-primary">10</span>
                <span className="text-gray">&nbsp;ITEMS</span>
                <img src={VerifiedCheck} alt="Check" className="ml-[3px]" />
              </p>
            </section>
            <section className="mt-[22px] w-full px-[3.25rem]">
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
            </section>
            {/* <section className="mt-[20px] mb-[75px]">
            
            </section> */}
            <section className="grid grid-cols-5">
              {data.length > 0 ? (
                data
              ) : (
                <p className="flex flex-col justify-center items-center font-primary ml-2">
                  There are no NFTs with such specifications.
                </p>
              )}
            </section>
          </main>
        </MainLayout>
      </div>
    );
  } else {
    return <Navigate to="/" replace />;
  }
};

export default Profile;
