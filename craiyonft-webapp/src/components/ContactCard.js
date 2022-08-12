import React, { useState, useRef } from "react";
import PrimaryButton from "./PrimaryButton";
import Github from "../assets/Github.svg";
import Spinner from "./Spinner";
import emailjs from '@emailjs/browser';

const ContactCard = ({ image }) => {
  const [buttonContent, setButtonContent] = useState(<p>Contact Us</p>);
  const [sentMessage, setSentMessage] = useState(false);
  const form = useRef();
  const contactHandler = (e) => {
    e.preventDefault();  
    setButtonContent(<Spinner variant="light" />);
    // setTimeout(() => {
    //   setButtonContent(<p>Contact Us</p>);
    //   setSentMessage(true);
    // },8000);
    emailjs.sendForm(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, form.current, process.env.REACT_APP_PUBLIC_KEY)
      .then((result) => {
          console.log(result.text);
          setButtonContent(<p>Contact Us</p>);
          setSentMessage(true);
      }, (error) => {
          console.log(error.text);
          setButtonContent(<p>Contact Us</p>);
      });

  }
  return (
    <div
      className={
        "box-border border rounded-[9px] overflow-hidden my-10 w-[700px] bg-white"
      }
    >
      <img className="w-full" src={image} alt="contact" />
      <form className="px-6 py-4" onFocus={() => setSentMessage(false)} onSubmit={contactHandler} ref={form}>
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
            name="fullname"
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
            name="email"
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
            name="message"
            className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          />
        </div>
        <div className={`flex justify-between items-center`}>
          <div className="flex">
            <PrimaryButton text={buttonContent} className="mr-[12.73px]"/>
            <button
              type="submit"
              className="text-black font-medium rounded-lg text-sm p-1 text-center inline-flex items-center mr-2"
            >
              <a
                href="https://github.com/VMP-SG"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Github} alt="Github" />
              </a>
            </button>
          </div>
          {sentMessage && <p>Message Sent!</p>}
        </div>
      </form>
    </div>
  );
};

export default ContactCard;
