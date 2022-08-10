import React, { useEffect, useState, useMemo, useCallback } from "react";
import Modal from "./Modal";
import ModalTextbox from "./ModalTextbox";
import ModalImage from "./ModalImage";
import Spinner from "../Spinner";
import PrimaryButton from "../PrimaryButton";
import Refresh from "../../assets/Refresh.svg";
import Logout from "../../assets/Logout.svg";
import Lamb from "../../assets/placeholders/Lamb.svg";
import { useSelector, useDispatch } from "react-redux";
import P from "../../constants/paths";
import BN from "../../constants/number";
import RPC from "../../constants/tezos";
import BigNumber from "bignumber.js";
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { NetworkType } from "@airgap/beacon-wallet";
import { useNavigate } from "react-router-dom";
import { updateAddress } from "../../store/wallet";

const WalletModal = ({ showWallet, setShowWallet, setWallet, wallet }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const address = useSelector(state => state.wallet.address);
  const [tezosPrice, setTezosPrice] = useState(BN.ZERO);
  const [loadingBalance, setLoadingBalance] = useState(false);
  const [loadingAddress, setLoadingAddress] = useState(false);
  const [clickedRefresh, setClickRefresh] = useState(false);
  const [balance, setBalance] = useState(BN.ZERO);

  const Tezos = useMemo(() => {
    return new TezosToolkit(RPC.GHOSTNET);
  }, []);

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
    dispatch(updateAddress(""));
    setWallet(undefined);
    setBalance(BN.ZERO);
  };

  const refreshHandler = () => {
    setClickRefresh(true);
    fetchUserBalance(address)
  };

  const viewProfileHandler = () => {
    navigate({
      pathname: P.PATH_PROFILE,
      search: `?address=${address}`
    });
    setShowWallet(false);
  }

  const fetchUserBalance = useCallback(async(address) => {
    setLoadingBalance(true);
    const fetchedBalance = await Tezos.tz.getBalance(address);
    const userBalance = fetchedBalance.shiftedBy(-6);
    setBalance(userBalance);
    setLoadingBalance(false);
  },[Tezos.tz]);

  const loadWalletInfo = useCallback(async() => {
    if (wallet) {
      setLoadingBalance(true);
      setLoadingAddress(true);
      const userAddress = await wallet.getPKH();
      await fetchUserBalance(userAddress);
      dispatch(updateAddress(userAddress));
      setLoadingAddress(false);
    }
  }, [wallet, fetchUserBalance, dispatch]);

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
    loadWalletInfo();
  },[loadWalletInfo]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowWallet(false);
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  },[setShowWallet]);

  return (
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
        onClick={address ? viewProfileHandler : connectWalletHandler}
      />
    </Modal>
  );
}

export default WalletModal;
