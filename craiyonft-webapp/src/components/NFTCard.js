import React from "react";
import * as PANOLENS from "panolens";
import axios from "axios";

import Lightning from "../assets/Lightning.svg";
import OutlinedButton from "../components/OutlinedButton";
import Modal from "../components/Modal/Modal";
import ModalImage from "../components/Modal/ModalImage";
import ModalTextbox from "../components/Modal/ModalTextbox";
import PrimaryButton from "../components/PrimaryButton";

// import background from "../assets/stars_resized.png";
import { toggleFullScreen } from "../utils/utilFunctions";
import { BACKENDADDRESS } from "../constants/tezos";
import { getImageString } from "../utils/string";
import Spinner from "./Spinner";

const NFTCard = ({ className, cid, preview, description, date }) => {
  const name = "Placeholder Name";
  const panoRef = React.useRef(null);
  const [c, setC] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [nftModalButtonContent, setNftModalButtonContent] = React.useState(<Spinner variant="light" />)
  const src = getImageString(preview);
  if (description.length > 32) {
    description = `${description.slice(0, 32)}...`;
  }
  React.useEffect(() => {
    if (showModal) {
      setNftModalButtonContent(<Spinner variant="light" />)
      axios
        .post(BACKENDADDRESS + "/getimage", {
          cid: cid,
        })
        .then((res) => {
          const im = res.data.image;
          const ctr = panoRef.current;
          setNftModalButtonContent("Explore NFT")
          if (!ctr) return;
          if (!c) {
            setC(ctr);
            const panorama = new PANOLENS.ImagePanorama(im);
            const viewer = new PANOLENS.Viewer({
              container: ctr,
            });
            viewer.add(panorama);
          }
        });
    }
  }, [showModal, cid, c]);

  return (
    <div>
      <div ref={panoRef} className="max-h-0 max-w-0 childdivsdisplaynone" />
      <Modal
        headingText={name}
        onClose={() => {
          setShowModal(false);
        }}
        open={showModal}
      >
        <ModalImage src={src} className="mt-[16px]" />
        <ModalTextbox label="Metadata" className="mt-[8px]">
          <p className="text-[10.67px] py-[8px]">{description}</p>
        </ModalTextbox>
        <ModalTextbox label="Mint Date" className="mt-[8px]">
          <p className="text-[10.67px] py-[8px]">{date}</p>
        </ModalTextbox>
        <PrimaryButton
          text={nftModalButtonContent}
          className="m-auto mt-[16px]"
          onClick={() => {
            toggleFullScreen(c);
          }}
        />
      </Modal>
      <div
        className={`w-[223.96px] h-[311.36px] bg-white border-gray-dark border ${className} rounded-[6px] pt-[12.81px] pl-[12.85px] pr-[13.3px] pb-[15.21px] font-primary hover:border-2`}
      >
        <img
          src={src}
          height="197.8"
          width="100%"
          className="rounded-[5.62887px]"
          alt="NFT"
        />
        <div className="flex items-center justify-between mt-[7.63px]">
          <span className="text-[12px] leading-[16.39px] font-bold text-gray-dark">
            {name}
          </span>
          <span className="text-[8px] font-secondary text-gray-light leading-[10.42px]">
            {cid.slice(0, 5) + "..."}
          </span>
        </div>
        <div className="mt-[6.46px] flex gap-[3px]">
          <span className="text-[10px] leading-[13.66px]">{description}</span>
          <img src={Lightning} alt="Logo" height="12.36px" />
        </div>
        <OutlinedButton
          text="View more"
          className="text-[10.67px] h-[27.52px] w-[89.37px]"
          onClick={() => {
            // c.mozRequestFullScreen();
            setShowModal(true);
          }}
        />
      </div>
    </div>
  );
};

export default NFTCard;
