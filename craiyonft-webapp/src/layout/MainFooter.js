import { NavLink } from "react-router-dom";
import P from "../constants/paths";
import Logo from "../assets/LogoB&W.svg";
import Github from "../assets/GithubWhite.svg";

const MainFooter = () => {
  return (
    <div className="flex flex-col items-center font-primary bg-gray-dark">
      <div className="p-5 w-[var(--max-screen-width)] text-white">
        <div className="flex justify-start align-between p-10 my-10">
          <div className="ml-[80px] w-[290px]">
            <NavLink to={P.PATH_HOME}>
              <div className="flex items-center font-logo text-[17.07px] text-xl">
                <div>
                  <img src={Logo} alt="Logo" />
                  <span className="h-[19.65px] leading-[20.48px] text-white ml-[4.27px]">
                    CraiyoNFT
                  </span>
                </div>
              </div>
            </NavLink>
            <div className="text-xs mt-5">
              The world's first and largest digital marketplace for crypto
              collectibles and non-fungible tokens (NFTs). Buy, sell and
              discover exclusive digital tokens.
            </div>
          </div>
          <div className="mx-10">
            <p className="text-primary font-bold mb-3">Browse</p>
            <p className="text-xs my-2">
              <NavLink to={P.PATH_GALLERY}>Discover</NavLink>
            </p>
            <p className="text-xs my-2">
              <NavLink to={P.PATH_ABOUT}>About Us</NavLink>
            </p>
            <p className="text-xs my-2">
              <NavLink to={P.PATH_ABOUT}>Contact Us</NavLink>
            </p>
            <p className="text-xs my-2">
              <NavLink to={P.PATH_ABOUT}>How it works</NavLink>
            </p>
          </div>
          <div className="mx-10">
            <p className="text-primary font-bold mb-3">My Account</p>
            <p className="text-xs my-2">
              <NavLink to={P.PATH_ABOUT}>Profile</NavLink>
            </p>
            <p className="text-xs my-2">
              <NavLink to={P.PATH_ABOUT}>Create</NavLink>
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="text-xs font-bold flex justify-center items-center w-[1000px] border-t-2 border-white-900 pt-2">
            {new Date().getFullYear()} - All Rights Reserved &copy; APYNIF |
            Powered by Team VMP-SG{" "}
            <a href="https://github.com/VMP-SG" target="_blank" rel="noopener noreferrer">
              <button
                type="button"
                className="text-black font-medium rounded-lg text-xs p-1 text-center inline-flex items-center mx-2"
              >
                <img src={Github} alt="Github" />
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainFooter;
