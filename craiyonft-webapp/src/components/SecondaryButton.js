import Arrow from "../assets/RightArrow.svg";

const SecondaryButton = ({ onClick, text }) => {
  return (
    <button className="font-primary text-[11.33px] hover:underline flex justify-center gap-[7px] items-center leading-[15.48px]" onClick={onClick}>
      {text}
      <img src={Arrow} alt="Right Arrow" className="w-[13px]" />
    </button>
  );
}

export default SecondaryButton;
