import React from "react";
import Grid from "../assets/Grid.svg";
import Search from "../assets/Search.svg";

const CategoryButton = ({
  categoryList,
  setCategoryList,
  className,
  searchText,
  setSearchText,
}) => {
  const [clicked, setClicked] = React.useState(false);
  const icon = clicked ? Search : Grid;
  const onEnter = (e) => {
    if (e.key === "Enter") {
      setCategoryList([...categoryList, searchText]);
      setSearchText("");
    }
  };
  const inButton = clicked ? (
    <input
      type="search"
      className="
      transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
    "
      id="search"
      placeholder="Enter Category"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      autoFocus
      onKeyDown={onEnter}
      onBlur={() => setClicked(false)}
    />
  ) : (
    "Category"
  );
  return (
    <button
      className={`border border-gray-dark hover:border-2 flex items-center rounded-[21px] text-blue-dark bg-white text-[11.33px] font-primary leading-[15.48px] font-medium mt-5 justify-evenly ${className}`}
      onClick={() => {
        setClicked(true);
      }}
    >
      <img src={icon} alt="grid" className="h-4 w-4 mr-2" />
      {inButton}
    </button>
  );
};

export default CategoryButton;
