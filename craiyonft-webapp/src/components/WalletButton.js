import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import P from "../constants/paths";

const WalletButton = ({ onClickWallet, src, text, disabled }) => {
  const navigate = useNavigate();
  const address = useSelector(state => state.wallet.address);
  const profileHandler = () => {
    navigate({
      pathname: P.PATH_PROFILE,
      search: `?address=${address}`
    });
  }

  return (
    <>
      <button disabled={disabled} onClick={profileHandler} className='rounded-tl-[16px] rounded-bl-[16px] h-[29.33px] w-[34.52px] border border-gray-dark flex items-center justify-center hover:border-2 disabled:hover:border'>
        <img src={src} alt="Profile" />
      </button>
      <button className='border border-gray-dark rounded-tr-[16px] rounded-br-[16px] h-[29.33px] w-[68.23px] relative -left-[1px] font-secondary text-gray-dark text-[11.3333px] hover:border-2' onClick={onClickWallet}>
        {text}
      </button>
    </>
  );
}

export default WalletButton;
