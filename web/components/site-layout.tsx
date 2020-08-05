import React from "react";

import Header from "./header";
import NavBar from "./nav-bar";
import Footer from "./footer";

const SiteLayout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default SiteLayout;
