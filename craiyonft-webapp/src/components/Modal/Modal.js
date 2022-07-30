import Close from "../../assets/Close.svg";
import { Transition } from "@headlessui/react";

const Modal = ({ children, showWallet, headingText, onClose, className }) => {
  return (
    <Transition
      show={showWallet}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0 h-screen w-screen z-50 bg-black bg-opacity-40 fixed flex justify-center items-center font-primary"
      enterTo="opacity-100 h-screen w-screen z-50 bg-black bg-opacity-40 fixed flex justify-center items-center font-primary"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100 h-screen w-screen z-50 bg-black bg-opacity-40 fixed flex justify-center items-center font-primary"
      leaveTo="opacity-0 h-screen w-screen z-50 bg-black bg-opacity-40 fixed flex justify-center items-center font-primary"
    >
    <div className={`${className}`}>
      <div className="w-[333.33px] bg-white shadow-md rounded-[13.33px] pt-[13.33px] pb-[16.33px] px-[21.33px]">
        <div className="flex justify-center w-full relative">
          <p className="text-blue-dark text-[24px] font-extrabold leading-[32.78px]">{headingText}</p>
          <img src={Close} alt="Close Modal" className="absolute right-0 top-[4px] cursor-pointer h-[22.67px]" onClick={onClose} />
        </div>
        {children}
      </div>
    </div>
  </Transition>
  );
}

export default Modal;
