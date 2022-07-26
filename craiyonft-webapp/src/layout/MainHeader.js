import React from "react";
import { Link } from "react-router-dom";
import P from "../constants/paths";

const MainHeader = () => {
  return (
    <nav className="flex justify-center items-center">
      <ul className="flex">
        <li className="mr-6">
          <p>CraiyoNFT</p>
        </li>
        <li className="mr-6">
          <Link to={P.PATH_HOME} className="text-blue-500 hover:text-blue-800">
            Home
          </Link>
        </li>
        <li className="mr-6">
          <Link to={P.PATH_MINT} className="text-blue-500 hover:text-blue-800">
            Mint
          </Link>
        </li>
        <li className="mr-6">
          <Link
            to={P.PATH_GALLERY}
            className="text-blue-500 hover:text-blue-800"
          >
            Gallery
          </Link>
        </li>
        <li className="mr-6">
          <Link to={P.PATH_ABOUT} className="text-blue-500 hover:text-blue-800">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MainHeader;
