const WalletButton = ({ onClickWallet, src, text }) => {
  return (
    <>
      <button disabled className='rounded-tl-[16px] rounded-bl-[16px] h-[29.33px] w-[34.52px] border border-gray-dark flex items-center justify-center'>
        <img src={src} alt="Profile" />
      </button>
      <button className='border border-gray-dark rounded-tr-[16px] rounded-br-[16px] h-[29.33px] w-[68.23px] relative -left-[1px] font-secondary text-gray-dark text-[11.3333px] hover:border-2' onClick={onClickWallet}>
        {text}
      </button>
    </>
  );
}

export default WalletButton;
