import React from 'react';
import Profile from '../assets/Profile.svg';

const WalletButton = ({ onClickWallet }) => {
  return (
    <>
      <button disabled className='rounded-tl-[16px] rounded-bl-[16px] h-[29.33px] w-[34.52px] border border-color-gray-dark flex items-center justify-center'>
        <img src={Profile} alt="Profile" />
      </button>
      <button className='border border-color-gray-dark rounded-tr-[16px] rounded-br-[16px] h-[29.33px] w-[68.23px] relative -left-[1px] font-secondary text-grat-dark text-[11.3333px] hover:border-2' onClick={onClickWallet}>
        Wallet
      </button>
    </>
  );
}

export default WalletButton;
