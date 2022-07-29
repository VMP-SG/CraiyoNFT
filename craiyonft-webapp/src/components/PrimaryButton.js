import React from "react";

const PrimaryButton = ({ text, className, onClick }) => {
  return (
    <button
      className={`box-border border border-transparent hover:border-black py-[6.33px] px-[24.5px] flex items-center justify-center rounded-[15.43px] text-blue-dark bg-primary text-[11.33px] leading-[15.48px] font-medium ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
