import MainLayout from "../layout/MainLayout";
import AboutCard from "../components/AboutCard";
import ContactCard from "../components/ContactCard";
import HUIX from "../assets/cartoon_dog_drink_alcohol_2.png";
import KEVIN from "../assets/cartoon_frog_doing_pullups_3.png";
import HC from "../assets/monkey_using_a_computer_2.png";
import cat from "../assets/cat.png";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const About = () => {
  const location = useLocation();
  const contactRef = useRef(null);
  useEffect(() => {
    if (location.state.location === "contact") {
      const elTop = contactRef.current?.getBoundingClientRect().top;
      if (elTop) {
        const y = elTop + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="bg-[url('assets/AboutBackground1.png'),_url('assets/AboutBackground2.png')] bg-[position:right_top,_left_bottom_400px] bg-no-repeat bg-[length:900px,_900px]">
      <MainLayout>
        <main className="flex flex-col justify-center items-center">
          <section className="flex flex-col font-primary text-center w-[800px] mt-16">
            <h1 className="font-extrabold text-6xl text-blue-dark  m-5">
              About Us
            </h1>
            <p className="text-gray m-5">
              CraiyoNFT was a project inspired by Craiyon. As a bunch of
              individuals interested in both Defi and Machine Learning, we
              decided to incorporate both of these elements together, and hence
              the CraiyoNFT marketplace was born. We are in no way affiliated
              with the creators of Craiyon.
            </p>
          </section>
          <div className="font-extrabold text-[24px] text-blue-dark font-primary mt-20 ml-5 self-start relative">
            <div className="absolute left-0 bottom-0 w-[50px] h-[12.67px] bg-[#FFB8DA] z-[-1]" />
            <p>Meet the Creators</p>
          </div>
          <section className={`box-border flex justify-center`}>
            <AboutCard
              name="Ng Ho Chi"
              image={HC}
              url={"https://www.linkedin.com/in/nghochi/"}
              address="tz1agHVDYkH74EdTk2GVNcXBgRqmmRgD6RoB"
            />
            <AboutCard
              name="Kevin Chang"
              image={KEVIN}
              url={"https://www.linkedin.com/in/kevin-chang-jon-kit-25759314a/"}
              address="tz1c8Vr4mMbVg8WvqxDqqC4vyX4WiWQKpLoT"
            />
            <AboutCard
              name="Chay Hui Xiang"
              image={HUIX}
              url={"https://www.linkedin.com/in/hui-xiang/"}
              address="tz1VrzLy7tMMVc5sWbvXEAmYmUsKj6mQnWWK"
            />
          </section>
          <section
            className="flex flex-col text-center w-[600px] mt-32"
            ref={contactRef}
          >
            <h1 className="font-extrabold text-6xl text-blue-dark font-primary m-5">
              Contact Us
            </h1>
            <p className="text-gray font-primary m-5">
              Want to get in touch with us? We're happy to hear from you!
            </p>
          </section>
          <section className={`box-border flex justify-center`}>
            <ContactCard image={cat} />
          </section>
        </main>
      </MainLayout>
    </div>
  );
};

export default About;
