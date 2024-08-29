import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="bg-[#F4F3F2]">
      <Navbar />
      <div className=" min-h-[100vh]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
