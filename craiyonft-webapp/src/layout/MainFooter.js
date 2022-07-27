import { NavLink } from "react-router-dom";
import P from "../constants/paths";

const MainFooter = () => {
  return (
    <div className="flex flex-col items-center font-primary">
      <div className="p-5 w-[var(--max-screen-width)] bg-gray-dark text-white">
        <div className="flex justify-start align-between p-10 my-10">
          <div className="ml-[80px] w-[290px]">
            <NavLink to={P.PATH_HOME}>
              <div className="flex items-center font-logo text-[17.07px] text-xl">
                <div>
                  <svg
                    width="60"
                    height="44"
                    viewBox="0 0 60 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M24.2964 2.30177C25.1914 2.59045 25.8 3.43975 25.8 4.39999V15.4L34.4 15.4C35.2017 15.4 35.9368 15.8564 36.307 16.584C36.6773 17.3116 36.6211 18.1896 36.1614 18.8616L21.1114 40.8616C20.5732 41.6483 19.5986 41.9869 18.7036 41.6982C17.8086 41.4095 17.2 40.5602 17.2 39.6L17.2 28.6H8.60002C7.79834 28.6 7.06324 28.1436 6.69301 27.416C6.32279 26.6884 6.37894 25.8104 6.83867 25.1384L21.8887 3.13837C22.4268 2.35172 23.4014 2.01308 24.2964 2.30177Z"
                      fill="#FFFFFF"
                      stroke="black"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M41.2964 2.30177C42.1914 2.59045 42.8 3.43975 42.8 4.39999V15.4L51.4 15.4C52.2017 15.4 52.9368 15.8564 53.307 16.584C53.6773 17.3116 53.6211 18.1896 53.1614 18.8616L38.1114 40.8616C37.5732 41.6483 36.5986 41.9869 35.7036 41.6982C34.8086 41.4095 34.2 40.5602 34.2 39.6L34.2 28.6H25.6C24.7983 28.6 24.0632 28.1436 23.693 27.416C23.3228 26.6884 23.3789 25.8104 23.8387 25.1384L38.8887 3.13837C39.4268 2.35172 40.4014 2.01308 41.2964 2.30177Z"
                      fill="#FFFFFF"
                      stroke="black"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  <span className="h-[19.65px] leading-[20.48px] text-white ml-[4.27px]">
                    Craiyo NFT
                  </span>
                </div>
              </div>
            </NavLink>
            <div className="text-xs">
              The world's first and largest digital marketplace for crypto
              collectibles and non-fungible tokens (NFTs). Buy, sell and
              discover exclusive digital tokens.
            </div>
          </div>
          <div className="mx-10">
            <p className="text-primary">Browse</p>
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
            <p className="text-primary">My Account</p>
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
            <a href="https://github.com/VMP-SG">
              <button
                type="button"
                className="text-black font-medium rounded-lg text-xs p-1 text-center inline-flex items-center mx-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                    fill="#FFFFFF"
                  />
                </svg>
                <span className="sr-only">Icon description</span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainFooter;
