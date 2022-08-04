import { Navigate, useSearchParams } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import { isTezosAddress } from "../utils/address";
import Cover from "../assets/ProfileCover.png";
import ProfileAvatar from "../components/ProfileAvatar";
import VerifiedCheck from "../assets/VerifiedCheck.svg";
import NFTCard from "../components/NFTCard";
import Lamb from "../assets/placeholders/Lamb.svg";

const Profile = () => {
  const [searchParams] = useSearchParams();
  const address = searchParams.get("address");
  if (isTezosAddress(address)) {
    return (
      <div>
        <MainLayout>
          <main className="flex flex-col justify-center items-center font-primary text-[42.67px] leading-[58.28px]">
            <img src={Cover} alt="Cover" />
            <ProfileAvatar className="top-24" />
            <section className="mt-[40px] text-[18.67px] font-semibold leading-[25.5px]">
              <p>{address}</p>
              <p className="mt-[4px] flex leading-[16.39px] justify-center text-[12px]">
                <span className="text-primary">10</span>
                <span className="text-gray">&nbsp;ITEMS</span>
                <img src={VerifiedCheck} alt="Check" className="ml-[3px]" />
              </p>
            </section>
            <section className="mt-[22px]">
            </section>
            <section className="mt-[20px] mb-[75px]">
              <div className="flex gap-[16px]">
                <NFTCard 
                  src={Lamb}
                  id="0000"
                  description="Sheep Coffee Cap Green Horns"
                />
                <NFTCard 
                  src={Lamb}
                  id="0000"
                  description="Sheep Coffee Cap Green Horns"
                />
                <NFTCard 
                  src={Lamb}
                  id="0000"
                  description="Sheep Coffee Cap Green Horns"
                />
                <NFTCard 
                  src={Lamb}
                  id="0000"
                  description="Sheep Coffee Cap Green Horns"
                />
                <NFTCard 
                  src={Lamb}
                  id="0000"
                  description="Sheep Coffee Cap Green Horns"
                />
              </div>
              <div className="flex gap-[16px] mt-[16px]">
                <NFTCard 
                  src={Lamb}
                  id="0000"
                  description="Sheep Coffee Cap Green Horns"
                />
                <NFTCard 
                  src={Lamb}
                  id="0000"
                  description="Sheep Coffee Cap Green Horns"
                />
                <NFTCard 
                  src={Lamb}
                  id="0000"
                  description="Sheep Coffee Cap Green Horns"
                />
                <NFTCard 
                  src={Lamb}
                  id="0000"
                  description="Sheep Coffee Cap Green Horns"
                />
                <NFTCard 
                  src={Lamb}
                  id="0000"
                  description="Sheep Coffee Cap Green Horns"
                />
              </div>
            </section>
          </main>
        </MainLayout>
      </div>
    );
  } else {
    return <Navigate to="/" replace />
  }
};

export default Profile;
