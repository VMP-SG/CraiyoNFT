import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import Mint from "./pages/Mint";
import P from "./constants/paths";
import "./index.css";
import ScrollToTop from "./components/ScrollToTop";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path={P.PATH_HOME} element={<Home />} />
      <Route path={P.PATH_ABOUT} element={<About />} />
      <Route path={P.PATH_GALLERY} element={<Gallery />} />
      <Route path={P.PATH_MINT} element={<Mint />} />
    </Routes>
  </BrowserRouter>
);
