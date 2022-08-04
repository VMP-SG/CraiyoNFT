import React from "react";
import MainLayout from "../layout/MainLayout";
import gallerytest from "../testdata/gallery.json";
import NFTCard from "../components/NFTCard";
import CardSpacing from "../components/spacings/CardSpacing";
import OutlinedButton from "../components/OutlinedButton";

const Gallery = () => {
  const [sort, setSort] = React.useState("Recently Added");
  const gallery = gallerytest
    ? gallerytest.data["collection"].map((item, i) => {
        return (
          <CardSpacing>
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
            <OutlinedButton
              text="Category"
              className="text-[10.67px] h-[29.33px] w-[98.02px] m-2"
            />
            <OutlinedButton
              text={`Sort by: ${sort}`}
              className="text-[10.67px] h-[29.33px] w-[175.42px] m-2"
            />
          </div>
          <div className="grid grid-cols-5 gap 4">{gallery}</div>
        </main>
      </MainLayout>
    </div>
  );
};

export default Gallery;
