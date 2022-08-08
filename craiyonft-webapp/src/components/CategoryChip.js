const CategoryChip = ({ text, onClose, className }) => {
  return (
    <div className="flex flex-wrap justify-center items-center space-x-2">
      <span
        className={`border border-gray-dark hover:border-2 flex items-center rounded-[21px] text-blue-dark bg-white text-[11.33px] font-primary leading-[15.48px] font-medium mt-5 justify-evenly ${className}`}
      >
        {text}
        <button
          className="bg-transparent hover focus:outline-none"
          onClick={() => onClose(text)}
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="times"
            className="w-2 ml-3"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 352 512"
          >
            <path
              fill="currentColor"
              d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
            ></path>
          </svg>
        </button>
      </span>
    </div>
  );
};

export default CategoryChip;
