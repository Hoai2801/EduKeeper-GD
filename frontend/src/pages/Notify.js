import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";

const NoticeWarning = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="bg-white ">
      <div className=" flex justify-center min-h-[100vh]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default NoticeWarning;
