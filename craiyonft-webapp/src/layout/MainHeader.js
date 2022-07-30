import React, { useEffect, useState, useMemo, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Lamb from "../assets/placeholders/Lamb.svg";
import Logo from "../assets/Logo.svg";
import Logout from "../assets/Logout.svg";
import Refresh from "../assets/Refresh.svg";
import Modal from "../components/Modal/Modal";
import ModalImage from "../components/Modal/ModalImage";
import ModalTextbox from "../components/Modal/ModalTextbox";
import PrimaryButton from "../components/PrimaryButton";
import WalletButton from "../components/WalletButton";
import Spinner from "../components/Spinner";
import P from "../constants/paths";
import RPC from "../constants/tezos";
import BN from "../constants/number";
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { NetworkType } from "@airgap/beacon-wallet";
import BigNumber from "bignumber.js";
import Profile from '../assets/Profile.svg';
import Cat from "../assets/WalletCat.svg";
import { truncateAddress } from "../utils/address";

const MainHeader = () => {
  const location = useLocation();
  const [atContact, setAtContact] = useState(false);
  const [enteredContact, setEnteredContact] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(BN.ZERO);
  const [clickedRefresh, setClickRefresh] = useState(false);
  const [tezosPrice, setTezosPrice] = useState(BN.ZERO);
  const [wallet, setWallet] = useState(undefined);
  const [loadingBalance, setLoadingBalance] = useState(false);
  const [loadingAddress, setLoadingAddress] = useState(false);

  const Tezos = useMemo(() => {
    return new TezosToolkit(RPC.GHOSTNET);
  }, []);

  const fetchUserBalance = useCallback(async(address) => {
    setLoadingBalance(true);
    const userBalance = await Tezos.tz.getBalance(address);
    setBalance(userBalance);
    setLoadingBalance(false);
  },[Tezos.tz]);

  const loadWalletInfo = useCallback(async() => {
    if (wallet) {
      setLoadingBalance(true);
      setLoadingAddress(true);
      const userAddress = await wallet.getPKH();
      await fetchUserBalance(userAddress);
      setAddress(userAddress);
      setLoadingAddress(false);
    }
  }, [wallet, fetchUserBalance]);

  const connectWalletHandler = () => {
    const walletConnection = async () => {
      const newWallet = new BeaconWallet({
        name: "CraiyoNFT",
        preferredNetwork: NetworkType.GHOSTNET,
      });
      const activeAccount = await newWallet.client.getActiveAccount();
      if (!activeAccount) {
        await newWallet.requestPermissions({
          network: {
            type: NetworkType.GHOSTNET,
            rpcUrl: RPC.GHOSTNET,
          },
        });
      }
      Tezos.setWalletProvider(newWallet);
      setWallet(newWallet);
    };
    try {
      walletConnection();
    } catch (error) {
      console.error(error);
    }
  };

  const disconnectWalletHandler = () => {
    wallet.client.destroy();
    setWallet(undefined);
    setAddress("");
    setBalance(BN.ZERO);
  };

  const refreshHandler = () => {
    setClickRefresh(true);
    fetchUserBalance(address)
  };

  useEffect(() => {
    loadWalletInfo();
  },[loadWalletInfo]);

  useEffect(() => {
    const fetchTezosPrice = async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=tezos&vs_currencies=usd"
      );
      const data = await response.json();
      const price = data.tezos.usd;
      setTezosPrice(new BigNumber(price));
    };
    fetchTezosPrice();
  });

  useEffect(() => {
    const listenToScroll = () => {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      if (winScroll < 905.5 && enteredContact) {
        setAtContact(false);
      } else if (winScroll >= 905.5 && !enteredContact) {
        setAtContact(true);
        setEnteredContact(true);
      } else {
        setAtContact(true);
      }
    };

    if (
      location.pathname === "/about"
    ) {
      window.addEventListener("scroll", listenToScroll);
      return () => window.removeEventListener("scroll", listenToScroll);
    }
  }, [location, enteredContact]);

  return (
    <nav className="flex w-full justify-center drop-shadow-md bg-white h-[57.6px] sticky top-0 z-10">
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
                (navData.isActive
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
                (navData.isActive && !atContact
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
                (navData.isActive && atContact
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
        <WalletButton onClickWallet={() => setShowWallet(true)} src={address ? Cat : Profile} text={address ? truncateAddress(address) : "Wallet"} />
      </div>
      <Modal
        headingText="My Wallet"
        onClose={() => setShowWallet(false)}
        open={showWallet}
      >
        <ModalTextbox
          label="Wallet Address"
          className="mt-[8px]"
          src={Logout}
          iconClassName="left-[1px]"
          onClick={disconnectWalletHandler}
        >
          <div className={`${loadingBalance ? "h-[32px]" : "py-[8px]"} text-[10.67px] flex justify-center items-center`}>
            { loadingAddress ? <Spinner /> : <p>{address ? address : "-"}</p> }
          </div>
        </ModalTextbox>
        <ModalTextbox
          label="Wallet Balance"
          className="mt-[16px]"
          src={Refresh}
          iconClassName={clickedRefresh && "animate-spin-once"}
          onClick={refreshHandler}
          onAnimationEnd={() => setClickRefresh(false)}
        >
          <div className={`${loadingBalance ? "h-[32px]" : "py-[8px]"} w-1/2 border-r text-[10.67px] flex items-center justify-center`}>
            {loadingBalance ? <Spinner /> : <p>{balance.toFormat(2)} XTZ</p>}
          </div>
          <div className={`${loadingBalance ? "h-[32px]" : "py-[8px]"} w-1/2 text-[10.67px] flex items-center justify-center`}>
            {loadingBalance ? <Spinner /> : <p>{balance.multipliedBy(tezosPrice).toFormat(2)} USD</p>}
          </div>
        </ModalTextbox>
        <ModalImage src={Lamb} className="mt-[16px]" />
        <PrimaryButton
          text={address ? "View Profile" : "Connect Wallet"}
          className="m-auto mt-[16px]"
          onClick={connectWalletHandler}
        />
      </Modal>
    </nav>
  );
};

export default MainHeader;
