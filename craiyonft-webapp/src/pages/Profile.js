import { Navigate, useSearchParams } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import { isTezosAddress } from "../utils/address";
import Cover from "../assets/ProfileCover.png";
import ProfileAvatar from "../components/ProfileAvatar";

const Profile = () => {
  const [searchParams] = useSearchParams();
  const address = searchParams.get("address");
  if (isTezosAddress(address)) {
    return (
      <div>
        <MainLayout>
          <main className="flex flex-col justify-center items-center font-primary text-[42.67px] leading-[58.28px]">
            <img src={Cover} alt="Cover" />
            <ProfileAvatar />
          </main>
        </MainLayout>
      </div>
    );
  } else {
    return <Navigate to="/" replace />
  }
};

export default Profile;
