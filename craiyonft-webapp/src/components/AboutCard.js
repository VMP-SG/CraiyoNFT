import React from "react";
import OutlinedButton from "./OutlinedButton";
import VerifiedCheck from "../assets/VerifiedCheck.svg";

const AboutCard = ({ name, image, url }) => {
  return (
    <div
      className={`box-border border p-5 m-5 h-[400px] w-[300px] rounded-[8.5px] text-black flex flex-col items-center bg-white`}
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
      <OutlinedButton
        onClick={() => {
          window.open(url, "_blank");
        }}
        text="View More"
        className="h-[50px] w-[120px]"
      />
    </div>
  );
};

export default AboutCard;
