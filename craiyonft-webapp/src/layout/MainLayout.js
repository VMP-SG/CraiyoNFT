import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";

const MainLayout = ({ children }) => {
  return (
    <div>
      <MainHeader />
      <div className="px-32 py-10">{children}</div>
      <MainFooter />
    </div>
  );
};

export default MainLayout;
