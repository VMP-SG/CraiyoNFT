import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";

const MainLayout = ({ children }) => {
  return (
    <div>
      <MainHeader />
      <div className="flex flex-col justify-center items-center">
        <div className="pb-10 max-w-[var(--max-screen-width)]">
          {children}
        </div>
      </div>
      <MainFooter />
    </div>
  );
};

export default MainLayout;
