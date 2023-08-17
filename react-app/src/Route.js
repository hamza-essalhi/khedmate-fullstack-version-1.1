import { Outlet } from "react-router-dom";
import MainNavBar from "./pages/components/MainNavBar";
import Footer from "./pages/components/Footer";

const CustomRoute = ({showNavAndFooter}) => {
  return (
    <>
      {/* navbar */}
      {showNavAndFooter && <MainNavBar />}
      
      {/* content */}
      <Outlet />
      {showNavAndFooter &&<Footer/>}
    </>
  );
};

export default CustomRoute;
