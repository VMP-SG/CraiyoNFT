import React from "react";
import { Link } from "react-router-dom";
import P from "../constants/paths";

const MainHeader = () => {
  return (
    <nav class="flex justify-center items-center">
      <ul class="flex">
        <li class="mr-6">
          <p>CraiyoNFT</p>
        </li>
        <li class="mr-6">
          <Link to={P.PATH_HOME} class="text-blue-500 hover:text-blue-800">
            Home
          </Link>
        </li>
        <li class="mr-6">
          <Link to={P.PATH_MINT} class="text-blue-500 hover:text-blue-800">
            Mint
          </Link>
        </li>
        <li class="mr-6">
          <Link to={P.PATH_GALLERY} class="text-blue-500 hover:text-blue-800">
            Gallery
          </Link>
        </li>
        <li class="mr-6">
          <Link to={P.PATH_ABOUT} class="text-blue-500 hover:text-blue-800">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MainHeader;
