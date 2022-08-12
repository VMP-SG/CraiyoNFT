import React from "react";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { NetworkType } from "@airgap/beacon-wallet";

const WalletContext = React.createContext({ 
  wallet: new BeaconWallet({
    name: "CraiyoNFT",
    preferredNetwork: NetworkType.GHOSTNET,
  }),
  setWallet: () => {}
});

export default WalletContext;
