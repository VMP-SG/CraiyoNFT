import { NavLink } from "react-router-dom";
import P from "../constants/paths";
import Logo from "../assets/LogoB&W.svg";
import Github from "../assets/GithubWhite.svg";
import { useSelector, useDispatch } from "react-redux";
import { updateMint } from "../store/ui";

const MainFooter = () => {
  const dispatch = useDispatch();
  const address = useSelector((state) => state.wallet.address);
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
              CraiyoNFT was a project inspired by Craiyon. We are in no way affiliated with the creators of Craiyon.
            </div>
          </div>
          <div className="mx-10">
            <p className="text-primary font-bold mb-3">Browse</p>
            <p className="text-xs my-2 hover:underline">
              <NavLink to={P.PATH_GALLERY}>Discover</NavLink>
            </p>
            <p className="text-xs my-2 hover:underline">
              <NavLink to={P.PATH_ABOUT} state={{ location: "about" }}>About Us</NavLink>
            </p>
            <p className="text-xs my-2 hover:underline">
              <NavLink to={P.PATH_ABOUT} state={{ location: "contact" }}>Contact Us</NavLink>
            </p>
            <a className="text-xs my-2 hover:underline" href="https://github.com/VMP-SG/CraiyoNFT/tree/main" target="_blank" rel="noopener noreferrer">
              <p>How it works</p>
            </a>
          </div>
          <div className="mx-10">
            <p className="text-primary font-bold mb-3">My Account</p>
            <p className="text-xs my-2 hover:underline">
              <NavLink to={{
                pathname: P.PATH_PROFILE,
                search: `?address=${address}`
              }}>Profile</NavLink>
            </p>
            <p className={`text-xs my-2 ${address ? "hover:underline cursor-pointer" : ""}`} onClick={address ? () => dispatch(updateMint(true)) : undefined}>
              Create
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="text-xs font-bold flex justify-center items-center w-[1000px] border-t-2 border-white-900 pt-2">
            {new Date().getFullYear()} - All Rights Reserved &copy; APYNIF |
            Powered by Team VMP-SG{" "}
            <a
              href="https://github.com/VMP-SG"
              target="_blank"
              rel="noopener noreferrer"
            >
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
