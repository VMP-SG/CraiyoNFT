import Arrow from "../assets/RightArrow.svg";

const SecondaryButton = ({ href, text }) => {
  return (
    <a className="font-primary text-[11.33px] hover:underline flex justify-center gap-[7px] items-center leading-[15.48px] cursor-pointer" href={href} target="_blank" rel="noopener noreferrer">
      {text}
      <img src={Arrow} alt="Right Arrow" className="w-[13px]" />
    </a>
  );
}

export default SecondaryButton;
