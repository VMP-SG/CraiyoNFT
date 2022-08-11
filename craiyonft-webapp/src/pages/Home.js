import NFTCard from "../components/NFTCard";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import MainLayout from "../layout/MainLayout";
import Lamb from "../assets/placeholders/Lamb.svg";
import Robot from "../assets/placeholders/Robot.svg";
import Bird from "../assets/placeholders/Bird.svg";
import Cloud from "../assets/placeholders/Cloud.svg";
import CategoryCard from "../components/CategoryCard";
import FooterArrow from "../assets/FooterArrow.svg";
import FooterEmphasis from "../assets/FooterEmphasis.svg";
import { useNavigate } from "react-router-dom";
import P from "../constants/paths";

const Home = () => {
  const navigate = useNavigate();
  const contactUsHandler = () => {
    navigate(P.PATH_ABOUT, { state: { location: "contact" } });
  };

  return (
    <div className="bg-[url('assets/HomeBackground.svg')] bg-[position:center_top] bg-no-repeat">
      <MainLayout>
        <main className="flex flex-col justify-center items-center font-primary text-[42.67px] leading-[58.28px]">
          <section className="text-center mt-[80px]">
            <p>
              <span className="font-extrabold">Discover,</span> create{" "}
              <span className="font-extrabold">and</span> show off
            </p>
            <div className="font-extrabold relative">
              <p>extraordinary NFTs</p>
              <div className="w-[92.2px] h-[25.92px] bg-[#A661FF] absolute bottom-1 right-[5.5rem] bg-opacity-30 z-[-1]" />
            </div>
            <div className="mt-[22.58px] flex justify-center gap-[17px]">
              <PrimaryButton text="Get Started" className="px-[17.33px]" />
              <SecondaryButton
                text="Learn more"
                href="https://github.com/VMP-SG/CraiyoNFT/tree/main"
              />
            </div>
          </section>
          <section className="mt-[39.1px] h-[443.51px] w-[1070.91px] relative">
            <NFTCard
              name={"Bob Ali Muthu Curry"}
              className="rotate-[-0.9deg] absolute left-[1rem] top-[1rem] scale-110 animate-pulse z-20 hover:animate-none"
              preview={Lamb}
              cid={"QmbkHyv439z8NX5yY1Srgu1Vbn6cAeDa4gFA3RwFcfTK9A"}
              description="Sheep Coffee Cap Green Horns"
              address="tz218937132"
            />
            <NFTCard
              name={"Bob Ali Muthu Curry"}
              className="rotate-[9.98deg] absolute left-[17rem] bottom-[2rem] scale-110 animate-pulse-2.25 z-20 hover:animate-none"
              preview={Robot}
              cid={"QmbkHyv439z8NX5yY1Srgu1Vbn6cAeDa4gFA3RwFcfTK9A"}
              description="Robot Candle Needle Blow Orange"
              address="tz218937132"
            />
            <NFTCard
              name={"Bob Ali Muthu Curry"}
              className="rotate-[0.38deg] absolute right-[18rem] bottom-12 scale-110 animate-pulse z-20 hover:animate-none"
              preview={Bird}
              cid={"QmbkHyv439z8NX5yY1Srgu1Vbn6cAeDa4gFA3RwFcfTK9A"}
              description="Gray Bird Headphones Machine Sky"
              address="tz218937132"
            />
            <NFTCard
              name={"Bob Ali Muthu Curry"}
              className="rotate-[8.62deg] absolute right-[2rem] bottom-[2rem] scale-110 animate-pulse-2.25 z-20 hover:animate-none"
              preview={Cloud}
              cid={"QmbkHyv439z8NX5yY1Srgu1Vbn6cAeDa4gFA3RwFcfTK9A"}
              description="3D Cloud Hat Ethereum Rainbow"
              address="tz218937132"
            />
          </section>
          <section className="mt-[61.4px] self-start w-[1150px]">
            <div className="font-extrabold text-[21.33px] text-gray-dark relative w-max leading-[29.14px]">
              <div className="absolute right-[-8px] bottom-0 bg-[#6DFF61] bg-opacity-30 h-[16.18px] w-[92.59px] z-[-1]" />
              <p>Browse by category</p>
            </div>
            <div className="flex gap-[18.13px] mt-[32.33px] relative">
              <CategoryCard category="Sheep" />
              <CategoryCard category="Sheep" />
              <CategoryCard category="Sheep" />
              <CategoryCard category="Sheep" />
              <CategoryCard category="Sheep" />
            </div>
          </section>
          <section>
            <div className="w-[743.86px] h-[133.33px] bg-primary relative top-28 rounded-[9px] flex items-center justify-center">
              <div className="flex">
                <div className="font-secondary text-green-dark leading-[36.67px] text-[24px] font-bold">
                  <p>Have any questions,</p>
                  <p>feel free to ask!</p>
                </div>
                <img src={FooterArrow} alt="Arrow" />
                <div className="relative ml-[20px] w-[194.04px] h-[77.75px] flex justify-center items-center">
                  <div className="w-[139.41px] h-[39.38px] relative">
                    <div className="w-[97%] h-[88%] bg-gray-dark absolute bg-opacity-30 right-0 bottom-0 rounded-[7px]" />
                    <button
                      className="w-[97%] h-[88%] bg-green-dark hover:bg-[#A0F1CA] text-[13.33px] font-bold text-white hover:text-green-dark hover:border rounded-[7px] leading-[18.21px] absolute flex justify-center items-center"
                      onClick={contactUsHandler}
                    >
                      <p>Contact Us</p>
                    </button>
                  </div>
                  <img
                    src={FooterEmphasis}
                    alt="Emphasis"
                    className="absolute left-[-10px] bottom-0 rotate-[8.98deg]"
                  />
                  <img
                    src={FooterEmphasis}
                    alt="Emphasis"
                    className="absolute right-0 top-[-10px] rotate-[150deg]"
                  />
                </div>
              </div>
            </div>
          </section>
        </main>
      </MainLayout>
    </div>
  );
};

export default Home;
