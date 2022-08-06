import Avatar from "../assets/ProfileAvatar.svg";
import VerifiedCheck from "../assets/VerifiedCheck.svg";

const ProfileAvatar = ({ className }) => {
  return (
    <div className={`absolute ${className}`}>
      <img src={Avatar} alt="Avatar" className="border-[2px] rounded-full" />
      <img src={VerifiedCheck} alt="Verified" width="28" className="absolute bottom-1 right-3"/>
    </div>
  );
}

export default ProfileAvatar;
