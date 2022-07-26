import MainLayout from "../layout/MainLayout";
import AboutCard from "../components/AboutCard";
import IMAGES from "../constants/images";
import ContactCard from "../components/ContactCard";

const About = () => {
  return (
    <MainLayout>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col text-center w-[600px]">
          <h1>About Us</h1>
          <p>
            CraiyoNFT was a project inspired by Craiyon. As a bunch of
            individuals interested in both Defi and Machine Learning, we decided
            to incorporate both of these elements together, and hence the
            CraiyoNFT marketplace was born. We are in no way affiliated with the
            creators of Craiyon.
          </p>
        </div>
        <h2 className="w-full">Meet the Creators</h2>
        <div className={`box-border flex justify-center`}>
          <AboutCard name="Ng Ho Chi" image={IMAGES.HC} />
          <AboutCard name="Kevin Chang" image={IMAGES.KEVIN} />
          <AboutCard name="Chay Hui Xiang" image={IMAGES.HUIX} />
        </div>
        <div className="flex flex-col text-center w-[600px]">
          <h1>Contact Us</h1>
          <p>Want to get in touch with us? We're happy to hear from you!</p>
        </div>
        <div className={`box-border flex justify-center`}>
          <ContactCard image={IMAGES.HUIX} />
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
