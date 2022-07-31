import React from "react";

const PrimaryButton = ({ text, className, onClick, disabled }) => {
  return (
    <button
      className={`box-border border border-transparent hover:border-black py-[6.33px] px-[24.5px] flex items-center justify-center rounded-[15.43px] text-blue-dark bg-primary text-[11.33px] leading-[15.48px] font-medium disabled:bg-white-dark disabled:text-gray disabled:hover:border-transparent ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
