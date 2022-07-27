import MainLayout from "../layout/MainLayout";
import AboutCard from "../components/AboutCard";
import IMAGES from "../constants/images";
import ContactCard from "../components/ContactCard";

const About = () => {
  return (
    <div className="bg-[url('assets/Aboutbackground.png')] bg-right-top bg-no-repeat">
      <MainLayout>
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col text-center w-[800px] mt-5">
            <h1 className="font-extrabold text-6xl text-blue-dark font-primary m-5">
              About Us
            </h1>
            <p className="text-gray font-primary m-5">
              CraiyoNFT was a project inspired by Craiyon. As a bunch of
              individuals interested in both Defi and Machine Learning, we
              decided to incorporate both of these elements together, and hence
              the CraiyoNFT marketplace was born. We are in no way affiliated
              with the creators of Craiyon.
            </p>
          </div>
          <h2 className="w-full font-extrabold text-xl text-blue-dark font-primary mt-10">
            Meet the Creators
          </h2>
          <div className={`box-border flex justify-center`}>
            <AboutCard name="Ng Ho Chi" image={IMAGES.HC} />
            <AboutCard name="Kevin Chang" image={IMAGES.KEVIN} />
            <AboutCard name="Chay Hui Xiang" image={IMAGES.HUIX} />
          </div>
          <div className="flex flex-col text-center w-[600px] mt-10">
            <h1 className="font-extrabold text-6xl text-blue-dark font-primary m-5">
              Contact Us
            </h1>
            <p className="text-gray font-primary m-5">
              Want to get in touch with us? We're happy to hear from you!
            </p>
          </div>
          <div className={`box-border flex justify-center`}>
            <ContactCard image={IMAGES.CAT} />
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default About;
