const ModalTextbox = ({
  label,
  className,
  src,
  children,
  iconClassName,
  onClick,
  onAnimationEnd,
  error
}) => {
  return (
    <div
      className={`font-primary font-bold text-gray-dark ${className} relative`}
    >
      <p className="leading-[16.39px] text-[12px]">{label}</p>
      <div className={`border ${error ? "border-error" : "border-gray-dark"} rounded-[22px] text-center mt-[8.67px] flex items-center justify-center`}>
        {children}
      </div>
      {src && (
        <div
          className="absolute rounded-full w-[20px] h-[20px] border bg-white flex items-center justify-center right-0 bottom-[-10px] hover:border-2 cursor-pointer"
          onClick={onClick}
        >
          <img
            src={src}
            alt="Logout"
            className={`relative ${iconClassName} h-[13.33px]`}
            onAnimationEnd={onAnimationEnd}
          />
        </div>
      )}
    </div>
  );
};

export default ModalTextbox;
