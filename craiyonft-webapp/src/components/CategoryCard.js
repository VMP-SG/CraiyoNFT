import Lamb from "../assets/placeholders/Lamb.svg";
import Bird from "../assets/placeholders/Bird.svg";
import Robot from "../assets/placeholders/Robot.svg";
import Cloud from "../assets/placeholders/Cloud.svg";
import Divider from "./Divider";
import OutlinedButton from "./OutlinedButton";

const CategoryCard = ({ category }) => {
  return (
    <div className="w-[218.63px] h-[337.65px] rounded-[6px] border border-gray-dark bg-white pt-[13.4px] pl-[16.68px] pr-[11.83px] font-primary">
      <div className="w-full h-[190px] relative">
        <img src={Cloud} className="w-[163.99px] h-[160.91px] absolute top-0 right-0 rounded-[6px] border  border-gray-dark object-cover" alt="NFT1" />
        <img src={Robot} className="w-[163.99px] h-[160.91px] absolute top-[10px] right-[8px] rounded-[6px] border  border-gray-dark object-cover" alt="NFT1" />
        <img src={Bird} className="w-[163.99px] h-[160.91px] absolute bottom-[10px] left-[8px] rounded-[6px] border  border-gray-dark object-cover" alt="NFT1" />
        <img src={Lamb} className="w-[163.99px] h-[160.91px] absolute bottom-0 left-0 rounded-[6px] border  border-gray-dark object-cover" alt="NFT1" />
      </div>
      <p className="mt-[9.57px] text-[14px] leading-[19.12px] text-blue-dark font-bold">{category}</p>
      <Divider className="mt-[7.56px]" />
      <div className="mt-[10.56px] w-[93px] flex justify-between">
        <div>
          <p className="font-extrabold text-[12.67px] leading-[17.3px] text-gray-dark">480k+</p>
          <p className="font-secondary text-[9.33px] leading-[12.15px] text-gray-light">Owners</p>
        </div>
        <div>
          <p className="font-extrabold text-[12.67px] leading-[17.3px] text-gray-dark">137k+</p>
          <p className="font-secondary text-[9.33px] leading-[12.15px] text-gray-light">Items</p>
        </div>
      </div>
      <OutlinedButton height={29.33} className="mt-[18px] w-[9rem]" text="Explore category" />
    </div>
  );
}

export default CategoryCard;
