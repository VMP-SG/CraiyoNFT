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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
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
  </Provider>
);
