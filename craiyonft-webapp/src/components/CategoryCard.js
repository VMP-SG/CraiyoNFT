import Lamb from "../assets/placeholders/Lamb.svg";
import Bird from "../assets/placeholders/Bird.svg";
import Robot from "../assets/placeholders/Robot.svg";
import Cloud from "../assets/placeholders/Cloud.svg";
import Divider from "./Divider";
import OutlinedButton from "./OutlinedButton";
import { useNavigate } from "react-router-dom";
import P from "../constants/paths";
import { capitalise, getImageString } from "../utils/string";
import Lightning from "../assets/Lightning.svg";

const CategoryCard = ({ category, data }) => {
  const navigate = useNavigate();
  const exploreCategoryHandler = () => {
    navigate(
      P.PATH_GALLERY, { state: { category } }
    );
  }

  return (
    <div className="w-[218.63px] h-[337.65px] rounded-[6px] border border-gray-dark bg-white pt-[13.4px] pl-[16.68px] pr-[11.83px] font-primary hover:border-2">
      <div className="w-full h-[190px] relative">
        <img src={data[3] ? getImageString(data[3].images[3]) : Cloud} className="w-[163.99px] h-[160.91px] absolute top-0 right-0 rounded-[6px] border  border-gray-dark object-cover" alt="NFT1" />
        <img src={data[2] ? getImageString(data[2].images[2]) : Robot} className="w-[163.99px] h-[160.91px] absolute top-[10px] right-[8px] rounded-[6px] border  border-gray-dark object-cover" alt="NFT2" />
        <img src={data[1] ? getImageString(data[1].images[1]) : Bird} className="w-[163.99px] h-[160.91px] absolute bottom-[10px] left-[8px] rounded-[6px] border  border-gray-dark object-cover" alt="NFT3" />
        <img src={data[0] ? getImageString(data[0].images[0]) : Lamb} className="w-[163.99px] h-[160.91px] absolute bottom-0 left-0 rounded-[6px] border  border-gray-dark object-cover" alt="NFT4" />
      </div>
      <p className="mt-[9.57px] text-[14px] leading-[19.12px] text-blue-dark font-bold">{capitalise(category)}</p>
      <Divider className="mt-[7.56px]" />
      <div className="mt-[10.56px] w-[93px] flex items-center gap-[4px]">
          <p className="font-extrabold text-[12.67px] leading-[17.3px] text-gray-dark">{data.length}</p>
          <p className="font-secondary text-[10px] leading-[12.15px] text-gray-light">Items</p>
          <img src={Lightning} alt="Logo" height="12.36px" />
      </div>
      <OutlinedButton className="mt-[18px] w-[9rem] h-[29.33px]" text="Explore category" onClick={exploreCategoryHandler}/>
    </div>
  );
}

export default CategoryCard;
