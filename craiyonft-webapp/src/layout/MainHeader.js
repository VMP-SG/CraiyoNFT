import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../assets/Logo.svg";
import Logout from "../assets/Logout.svg";
import Refresh from "../assets/Refresh.svg";
import Lamb from "../assets/Lamb.svg";
import Modal from "../components/Modal/Modal";
import PrimaryButton from "../components/PrimaryButton";
import WalletButton from "../components/WalletButton";
import ModalTextbox from "../components/Modal/ModalTextbox";
import P from "../constants/paths";
import ModalImage from "../components/Modal/ModalImage";

const MainHeader = () => {
  const [atContact, setAtContact] = useState(false);
  const [enteredContact, setEnteredContact] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const location = useLocation();

  const connectWalletHandler = () => {
    console.log("Connect wallet pl0x")
  }

  useEffect(() => {
    const listenToScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      if (winScroll < 905.5 && enteredContact) {
        setAtContact(false);
      } else if (winScroll >= 905.5 && !enteredContact) {
        setAtContact(true);
        setEnteredContact(true);
      } else {
        setAtContact(true);
      }
    }

    if (location.pathname === "/about" && location.state.location === "contact") {
      setAtContact(true);
      window.addEventListener("scroll", listenToScroll);
      return () => window.removeEventListener("scroll", listenToScroll);
    } else if (location.pathname === "/about" && location.state.location === "about") {
      setAtContact(false);
      window.addEventListener("scroll", listenToScroll);
      return () => window.removeEventListener("scroll", listenToScroll);
    }
  },[location, enteredContact])

  return (
    <nav className="flex w-full justify-center drop-shadow-md bg-white h-[57.6px] sticky top-0">
      <div className="flex items-center max-w-[var(--max-screen-width)] w-full">
        <NavLink to={P.PATH_HOME}>
          <div className="flex ml-[80px] bg-white-pale items-center font-logo text-[17.07px]">
            <img src={Logo} alt="Logo" className="h-[32px]" />
            <span className="h-[19.65px] leading-[20.48px] text-primary ml-[4.27px]">
              Craiyo
            </span>
            <span className="h-[19.65px] leading-[20.48px] text-secondary">
              NFT
            </span>
          </div>
        </NavLink>
        <ul className="flex ml-[230.67px] mr-[242.32px] gap-[23.47px] text-gray-dark font-secondary text-[11.33px] h-full items-center">
          <li className="h-full flex items-center">
            <NavLink
              to={P.PATH_GALLERY}
              className={(navData) =>
                ((navData.isActive)
                  ? "border-b text-blue-dark border-blue-dark"
                  : "hover:border-b hover:text-secondary border-secondary") +
                " h-full flex items-center"
              }
            >
              Discover
            </NavLink>
          </li>
          <li className="h-full flex items-center">
            <NavLink
              to={P.PATH_ABOUT}
              state={{ location: "about" }}
              className={(navData) =>
                ((navData.isActive && !atContact)
                  ? "border-b text-blue-dark border-blue-dark"
                  : "hover:border-b hover:text-secondary border-secondary") +
                " h-full flex items-center"
              }
            >
              About
            </NavLink>
          </li>
          <li className="h-full flex items-center">
            <NavLink
              to={P.PATH_ABOUT}
              state={{ location: "contact" }}
              className={(navData) =>
                ((navData.isActive && atContact)
                  ? "border-b text-blue-dark border-blue-dark"
                  : "hover:border-b hover:text-secondary border-secondary") +
                " h-full flex items-center"
              }
            >
              Contact Us
            </NavLink>
          </li>
          <li className="h-full flex items-center">
            <NavLink
              to={P.PATH_MINT}
              className={(navData) =>
                (navData.isActive
                  ? "border-b text-blue-dark border-blue-dark"
                  : "hover:border-b hover:text-secondary border-secondary") +
                " h-full flex items-center"
              }
            >
              How it works
            </NavLink>
          </li>
        </ul>
        <PrimaryButton text="Create" className="mr-[12.73px]" />
        <WalletButton onClickWallet={() => setShowWallet(true)}/>
      </div>
      <Modal headingText="My Wallet" onClose={() => setShowWallet(false)} showWallet={showWallet}>
        <ModalTextbox label="Wallet Address" className="mt-[8px]" src={Logout} iconClassName="left-[1px]">
          <p className="my-[8px] text-[10.67px]">tz1000000000000000000000000000000000</p>
        </ModalTextbox>
        <ModalTextbox label="Wallet Address" className="mt-[16px]" src={Refresh}>
          <div className="py-[8px] w-1/2 border-r text-[10.67px]">
            <p>5.00 XTZ</p>
          </div>
          <div className="py-[8px] w-1/2 text-[10.67px]">
            <p>8.45 USD</p>
          </div>
        </ModalTextbox>
        <ModalImage src={Lamb} className="mt-[16px]" />
        <PrimaryButton text="Connect Wallet" className="m-auto mt-[16px]" onClick={connectWalletHandler} />
      </Modal>
    </nav>
  );
};

export default MainHeader;
