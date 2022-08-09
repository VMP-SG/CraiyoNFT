import React from "react";
import OutlinedButton from "./OutlinedButton";
import VerifiedCheck from "../assets/VerifiedCheck.svg";
import { truncateAddress } from "../utils/address";

const AboutCard = ({ name, image, url, address }) => {
  const copyAddress = () => {
    navigator.clipboard.writeText(address);
  }
  return (
    <div
      className={`box-border border p-5 m-5 w-[300px] rounded-[8.5px] text-black flex flex-col items-center bg-white`}
    >
      <img
        src={image}
        alt={"profile"}
        className={`box-border rounded-[50%] h-[260px] w-[260px] mb-5 border`}
      />
      <div
        className={`box-border flex items-center justify-center gap-[3px] rounded-[21.7084px] font-medium`}
      >
        {name}
        <img src={VerifiedCheck} alt="Verified Check" />
      </div>
      <p className="font-secondary text-[12px] text-gray-light cursor-pointer" onClick={copyAddress}>{truncateAddress(address, 6, 3)}</p>
      <OutlinedButton
        onClick={() => {
          window.open(url, "_blank");
        }}
        text="View More"
        className="h-[32.17px] w-[120px]"
      />
    </div>
  );
};

export default AboutCard;
