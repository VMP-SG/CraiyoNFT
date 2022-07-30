import Lightning from "../assets/Lightning.svg";
import OutlinedButton from "../components/OutlinedButton";

const NFTCard = ({ className, src, id, description }) => {
  return (
    <div className={`w-[223.96px] h-[311.36px] bg-white border-gray-dark border ${className} rounded-[6px] pt-[12.81px] pl-[12.85px] pr-[13.3px] pb-[15.21px] font-primary hover:border-2`}>
      <img src={src} height="197.8" width="100%" className="rounded-[5.62887px]" alt="NFT"/>
      <div className="flex items-center justify-between mt-[7.63px]">
        <span className="text-[12px] leading-[16.39px] font-bold text-gray-dark" >Placeholder Name</span>
        <span className="text-[8px] font-secondary text-gray-light leading-[10.42px]">#{id}</span>
      </div>
      <div className="mt-[6.46px] flex gap-[3px]">
        <span className="text-[10px] leading-[13.66px]">{description}</span>
        <img src={Lightning} alt="Logo" height="12.36px" />
      </div>
      <OutlinedButton text="Buy now" className="text-[10.67px]" height={27.52} width={89.37} />
    </div>
  );  
}

export default NFTCard;
