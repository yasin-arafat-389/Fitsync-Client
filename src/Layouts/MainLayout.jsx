import { Outlet } from "react-router-dom";
import ScrollToTop from "../Utilities/ScrollToTop/ScrollToTop";
import NavBar from "../Components/NavBar/NavBar";
import { Toaster } from "react-hot-toast";
import Footer from "../Components/Footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <NavBar />
      <Toaster position="top-center" reverseOrder={false} />
      <ScrollToTop />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
