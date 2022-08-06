import Modal from "./Modal";
import ModalTextbox from "./ModalTextbox";
import ModalImage from "./ModalImage";
import PrimaryButton from "../PrimaryButton";
import Refresh from "../../assets/Refresh.svg";
import Trash from "../../assets/Trash.svg";
import Bear from "../../assets/placeholders/Bear.svg";
import randomWords from "random-words";
import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateMint } from "../../store/ui";
import Spinner from "../Spinner";

const errorTypes = {
  insufficient: "insufficient",
  tooMany: "tooMany"
}

const MintModal = () => {
  const dispatch = useDispatch();
  const [time, setTime] = useState(600);
  const dateString = useMemo(() => {
    let date = new Date(0);
    date.setSeconds(time);
    let dateString = date.toISOString().substring(14, 19);
    return dateString;
  }, [time]);

  const showMint = useSelector(state => state.ui.showMint);
  const address = useSelector(state => state.wallet.address);
  const [creatingNFT, setCreatingNFT] = useState(false);
  const [words, setWords] = useState([]);
  const [chosenWords, setChosenWords] = useState([]);
  const [clickedRefresh, setClickRefresh] = useState(false);
  const [error, setError] = useState(undefined);
  const generateWords = () => {
    const words = randomWords(10);
    setWords(words);
    setChosenWords([]);
  }

  const addWord = (filteredWord) => {
    const filteredWords = words.filter((word) => 
      word !== filteredWord
    );
    setWords(filteredWords);
    setChosenWords([...chosenWords, filteredWord]);
  }

  const removeWord = (filteredWord) => {
    const filteredWords = chosenWords.filter((word) =>
      word !== filteredWord
    );
    setWords([...words, filteredWord]);
    setChosenWords(filteredWords);
  }

  const removeAllWords = () => {
    setChosenWords([]);
    setWords([...words, ...chosenWords]);
  }

  const refreshWordsHandler = () => {
    setClickRefresh(true);
    generateWords();
  }

  const createNFTHandler = () => {
    if (chosenWords.length < 5) {
      setError(errorTypes.insufficient);
      return;
    } else if (chosenWords.length > 5) {
      setError(errorTypes.tooMany);
      return;
    } else {
      setError(undefined);
    }

    setCreatingNFT(true);
  }

  useEffect(() => {
    let timer;
    if (creatingNFT) {
      timer = setTimeout(() => {
        setTime((prevTime) => {
          return prevTime - 1;
        });
      }, 1000);
    }
    if (!time){
      clearTimeout(timer);
    }
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    generateWords();
  },[]);

  if (creatingNFT) {
    return (
      <Modal 
        headingText="Mint New NFT"
        open={showMint}
      >
        <div className="flex justify-center flex-col mt-[16px]">
          <Spinner className="h-16" />
          <p className="text-sm text-center mt-[16px] font-extrabold">Creating NFT...</p>
          <p className="text-sm text-center font-extrabold">Please do not close the tab.</p>
          <p className="text-xs text-center mt-[4px] text-gray">Estimated Time Left: <span>{dateString}</span></p>
        </div>
      </Modal>
    );
  } else {
    return (
      <Modal 
        headingText="Mint New NFT"
        onClose={() => dispatch(updateMint(false))}
        open={showMint}
      >
        <ModalTextbox
          label="Generated Words"
          className="mt-[8px]"
          src={Refresh}
          onClick={refreshWordsHandler}
          iconClassName={clickedRefresh && "animate-spin-once"}
          onAnimationEnd={() => setClickRefresh(false)}
        >
          <div className="flex flex-col py-[8px] text-gray text-[11px]">
            <p>{words.slice(0,5).map((word, index) =>
              <React.Fragment key={index}>
                <span className="hover:text-gray-dark hover:underline cursor-pointer" onClick={() => addWord(word)}>{word}</span>
                <span> </span>
              </React.Fragment>
            )}
            </p>
            <p>{words.slice(5).map((word, index) => 
              <React.Fragment key={index}>
                <span className="hover:text-gray-dark hover:underline cursor-pointer" onClick={() => addWord(word)}>{word}</span>
                <span> </span>
              </React.Fragment>
            )}
            </p>
          </div>
        </ModalTextbox>
        <ModalTextbox
          label="Selected Words"
          className="mt-[16px]"
          src={Trash}
          onClick={removeAllWords}
          error={error}
        >
          <p className="py-[8px] text-gray text-[11px]">
            {
              chosenWords.length === 0 ? 
              <span className="cursor-default">&nbsp;</span> :
              chosenWords.map((word, index) => 
              <React.Fragment key={index}>
                <span className="hover:text-gray-dark hover:underline cursor-pointer" onClick={() => removeWord(word)}>{word}</span>
                <span> </span>
              </React.Fragment>)
            }
          </p>
        </ModalTextbox>
        {error === errorTypes.insufficient && <p className="text-error text-[11px]">Insufficient words selected</p>}
        {error === errorTypes.tooMany && <p className="text-error text-[11px]">Too many words selected</p>}
        <ModalTextbox
          label="Wallet Address"
          className="mt-[16px]"
        >
          <p className="py-[8px] text-[11px]">{address}</p>
        </ModalTextbox>
        <ModalImage
          src={Bear}
          className="mt-[16px]"
        />
        <PrimaryButton 
          text="Create NFT"
          className="m-auto mt-[16px]"
          onClick={createNFTHandler}
        />
      </Modal>
    );
  }
}

export default MintModal;
