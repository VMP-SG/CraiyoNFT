import React from "react";

const LeftIconButton = ({ onClick, text, className, icon }) => {
  return (
    <button
      className={`border border-gray-dark hover:border-2 flex items-center rounded-[21px] text-blue-dark bg-white text-[11.33px] font-primary leading-[15.48px] font-medium mt-5 justify-evenly ${className}`}
      onClick={onClick}
    >
      <img src={icon} alt="icon" width="13.4%" />
      {text}
    </button>
  );
};

export default LeftIconButton;
