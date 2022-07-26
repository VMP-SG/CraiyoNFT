import React from "react";

const AboutCard = ({ name, image }) => {
  return (
    <div
      className={`box-border border p-5 m-5 h-[400px] w-[300px] rounded-[10px] text-black flex flex-col items-center`}
    >
      <img
        src={image}
        alt={"profile"}
        className={`box-border rounded-[50%] h-[260px] w-[260px] mb-5`}
      />
      <div
        className={`box-border flex items-center justify-center rounded-[21.7084px] font-medium`}
      >
        {name}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>
      <button
        className={`box-border border h-[50px] w-[120px] flex items-center justify-center rounded-[21px] text-blue-dark bg-white text-[11.33px] leading-[15.48px] font-medium mt-5 flex justify-evenly`}
      >
        View More
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </button>
    </div>
  );
};

export default AboutCard;
