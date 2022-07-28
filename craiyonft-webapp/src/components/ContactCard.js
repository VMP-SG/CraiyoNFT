import React from "react";
import PrimaryButton from "./PrimaryButton";
import Github from "../assets/Github.svg";

const AboutCard = ({ image }) => {
  return (
    <div
      className={
        "box-border border rounded-[9px] overflow-hidden my-10 w-[700px] bg-white"
      }
    >
      <img className="w-full" src={image} alt="contact" />
      <div className="px-6 py-4">
        <div className={`my-3`}>
          <label
            htmlFor="fullname"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullname"
            className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          />
        </div>
        <div className={`my-3`}>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          />
        </div>
        <div className={`my-3`}>
          <label
            htmlFor="small-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Message
          </label>
          <input
            type="text"
            id="small-input"
            className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          />
        </div>
        <div className={`flex`}>
          <PrimaryButton text="Contact Us" tw="mr-[12.73px]" />
          <button
            type="button"
            className="text-black font-medium rounded-lg text-sm p-1 text-center inline-flex items-center mr-2"
          >
            <img src={Github} alt="Github" />
            <span className="sr-only">Icon description</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutCard;
