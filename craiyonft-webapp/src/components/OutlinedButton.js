import React from "react";
import RightArrow from "../assets/RightArrow.svg";

const OutlinedButton = ({ onClick, text, className, height, width }) => {
  return (
    <button
      className={`border border-gray-dark hover:border-2 h-[${height}px] w-[${width}px] flex items-center rounded-[21px] text-blue-dark bg-white text-[11.33px] font-primary leading-[15.48px] font-medium mt-5 justify-evenly ${className}`} onClick={onClick}
    >
      {text}
      <img src={RightArrow} alt="Right Arrow" width="13.4%" />
    </button>
  );
}

export default OutlinedButton;
