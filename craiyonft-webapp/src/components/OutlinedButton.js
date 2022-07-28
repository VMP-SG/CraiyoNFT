import React from "react";
import RightArrow from "../assets/RightArrow.svg";

const OutlinedButton = ({onClick, text}) => {
  return (
    <button
      className={`box-border border border-gray-dark hover:border-2 h-[50px] w-[120px] flex items-center rounded-[21px] text-blue-dark bg-white text-[11.33px] font-primary leading-[15.48px] font-medium mt-5 justify-evenly`} onClick={onClick}
    >
      {text}
      <img src={RightArrow} alt="Right Arrow" />
    </button>
  );
}

export default OutlinedButton;
