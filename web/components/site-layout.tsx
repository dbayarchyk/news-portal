import React from "react";

import Header from "./header";
import NavBar from "./nav-bar";
import Footer from "./footer";
import styles from "./site-layout.module.scss";

const SiteLayout: React.FC = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header />
      <NavBar />
      <main className="layout-container">{children}</main>
      <Footer />
    </div>
  );
};

export default SiteLayout;
