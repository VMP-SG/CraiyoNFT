import React from "react";
import Sort from "../assets/Sort.svg";

const SortItem = ({ text, onSelect, className }) => {
  return (
    <li
      className={`flex justify-center p-2 text-[10.67px] ${className}`}
      onClick={() => onSelect(text)}
    >
      {text}
    </li>
  );
};

const options = ["Recently Added (Ascending)", "Recently Added (Descending)"];

const SortDropdown = ({ text, setSort }) => {
  const [open, setOpen] = React.useState(false);
  const onSelect = (option) => {
    setSort(option);
    setOpen(false);
  };
  return (
    <div>
      <button
        className={`text-[10.67px] h-[29.33px] w-[250px] m-2 border border-gray-dark hover:border-2 flex items-center rounded-[21px] text-blue-dark bg-white font-primary leading-[15.48px] font-medium mt-5 justify-evenly`}
        onClick={() => {
          setOpen(!open);
        }}
        // onBlur={() => {
        //   setOpen(false);
        // }}
      >
        {text}
        <img src={Sort} alt="sort" width="13.4%" className="h-4 w-4 mr-2" />
      </button>
      {open && (
        <ul
          className="absolute bg-white w-[250px] m-2 mt-0 border border-gray-dark rounded-[10px] overflow-hidden"
          aria-labelledby="dropdownMenuButton1"
        >
          {options.map((option) => (
            <SortItem
              key={option}
              text={option}
              onSelect={onSelect}
              className={"cursor-pointer hover:bg-[#F2EDED]"}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default SortDropdown;
