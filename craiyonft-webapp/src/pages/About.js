import MainLayout from "../layout/MainLayout";
import AboutCard from "../components/AboutCard";
import ContactCard from "../components/ContactCard";
import HUIX from "../assets/huix.jpg";
import KEVIN from "../assets/kevin.jpg";
import HC from "../assets/hochi.png";
import cat from "../assets/cat.png";

const About = () => {
  return (
    <div className="bg-[url('assets/AboutBackground1.png'),_url('assets/AboutBackground2.png')] bg-[position:right_top,_left_bottom_400px] bg-no-repeat bg-[length:900px,_900px]">
      <MainLayout>
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col font-primary text-center w-[800px] mt-5">
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
          </div>
          <h2 className="font-extrabold text-xl text-blue-dark font-primary mt-20 ml-5 self-start">
            Meet the Creators
          </h2>
          <div className={`box-border flex justify-center`}>
            <AboutCard name="Ng Ho Chi" image={HC} />
            <AboutCard name="Kevin Chang" image={KEVIN} />
            <AboutCard name="Chay Hui Xiang" image={HUIX} />
          </div>
          <div className="flex flex-col text-center w-[600px] mt-32">
            <h1 className="font-extrabold text-6xl text-blue-dark font-primary m-5">
              Contact Us
            </h1>
            <p className="text-gray font-primary m-5">
              Want to get in touch with us? We're happy to hear from you!
            </p>
          </div>
          <div className={`box-border flex justify-center`}>
            <ContactCard image={cat} />
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default About;
