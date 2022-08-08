import React from "react";
import Sort from "../assets/Sort.svg";
import SORT from "../constants/sort";

const SortItem = ({ text, onSelect, className }) => {
  return (
    <li
      className={`flex justify-center p-2 text-[10.67px] h-[32px] leading-[16px] ${className}`}
      onClick={() => onSelect(text)}
    >
      {text}
    </li>
  );
};

const options = [
  SORT.DATE_ASC,
  SORT.DATE_DES,
  SORT.ALPHABETICAL_ASC,
  SORT.ALPHABETICAL_DES,
  SORT.ADDRESS_ASC,
  SORT.ADDRESS_DES,
];

const SortDropdown = ({ text, setSort }) => {
  const [open, setOpen] = React.useState(false);
  const onSelect = (option) => {
    setSort(option);
    setOpen(false);
  };
  return (
    <div>
      <div
        className="cursor-pointer"
        tabIndex={0}
        onFocus={() => setOpen(open)}
        onBlur={() => setOpen(false)}
      >
        <div
          className={`text-[10.67px] h-[29.33px] w-[250px] m-2 border border-gray-dark hover:border-2 flex items-center rounded-[21px] text-blue-dark bg-white font-primary leading-[15.48px] font-medium mt-5 justify-evenly`}
          onClick={() => {
            setOpen(!open);
          }}
        >
          {text}
          <img src={Sort} alt="sort" width="13.4%" className="h-4 w-4 mr-2" />
        </div>
        <ul
          className={`absolute bg-white w-[250px] m-2 mt-0 border border-gray-dark rounded-[10px] overflow-hidden ${
            open ? "visibile" : "invisible"
          }`}
          aria-labelledby="dropdownMenuButton1"
        >
          {options.map((option) => (
            <SortItem
              key={option}
              text={option}
              onSelect={onSelect}
              className={"cursor-pointer hover:bg-white-dark"}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SortDropdown;
