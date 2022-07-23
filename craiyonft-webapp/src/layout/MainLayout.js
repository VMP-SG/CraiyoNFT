import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";

const MainLayout = ({ children }) => {
  return (
    <div>
      <MainHeader />
      <div class="px-52 py-10">{children}</div>
      <MainFooter />
    </div>
  );
};

export default MainLayout;
