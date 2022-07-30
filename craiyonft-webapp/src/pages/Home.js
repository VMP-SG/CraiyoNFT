import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import MainLayout from "../layout/MainLayout";

const Home = () => {
  return (
    <div className="bg-[url('assets/HomeBackground.svg')] bg-[position:center_top] bg-no-repeat">
      <MainLayout>
        <main className="flex flex-col justify-center items-center font-primary text-[42.67px] leading-[58.28px]">
          <section className="text-center mt-[40px]">
            <p>
              <span className="font-extrabold">Discover,</span> create <span className="font-extrabold">and</span> show off
            </p>
            <p className="font-extrabold">
              extraordinary NFTs
            </p>
            <div className="mt-[22.58px] flex justify-center gap-[17px]">
              <PrimaryButton text="Get Started" className="px-[17.33px]"/>
              <SecondaryButton text="Learn more" />
            </div>
          </section>
        </main>
      </MainLayout>
    </div>
  );
};

export default Home;
