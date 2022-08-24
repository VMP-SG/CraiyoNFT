import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import P from "./constants/paths";
import "./index.css";
import ScrollToTop from "./components/ScrollToTop";
import { store } from "./store";
import { Provider } from "react-redux";
import { useState, useEffect } from "react";
import WalletContext from "./store/context";
import Desktop from "./assets/Desktop.svg";
import Lightning from "./assets/Lightning.svg";

const App = () => {
  const [wallet, setWallet] = useState(undefined);
  const [isDesktop, setDesktop] = useState(window.innerWidth > 1220);
  const value = { wallet, setWallet };

  const updateMedia = () => {
    setDesktop(window.innerWidth > 1220);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  if (isDesktop) {
    return (
      <Provider store={store}>
        <WalletContext.Provider value={value}>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path={P.PATH_HOME} element={<Home />} />
              <Route path={P.PATH_ABOUT} element={<About />} />
              <Route path={P.PATH_GALLERY} element={<Gallery />} />
              <Route path={P.PATH_PROFILE} element={<Profile />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </WalletContext.Provider>
      </Provider>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center h-screen font-primary">
        <img src={Desktop} alt="Desktop" width="200" />
        <div className="flex gap-1">
          <p className="font-bold text-xl">Sorry!</p>
          <img src={Lightning} alt="Lighting" width="12"/>
        </div>
        <p>CraiyoNFT is only available for desktop view.</p>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <App />
);
