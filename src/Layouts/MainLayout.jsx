import { Outlet } from "react-router-dom";
import ScrollToTop from "../Utilities/ScrollToTop/ScrollToTop";
import NavBar from "../Components/NavBar/NavBar";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    <div>
      <NavBar />
      <Toaster position="top-right" reverseOrder={false} />
      <ScrollToTop />
      <Outlet />
    </div>
  );
};

export default MainLayout;
