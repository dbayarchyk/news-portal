import React from "react";

import Header from "./header";
import NavBar from "./nav-bar";
import Footer from "./footer";
import Container from "./ui/layouts/container";
import styles from "./site-layout.module.scss";

const SiteLayout: React.FC = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header />
      <NavBar />
      <main>
        <Container>{children}</Container>
      </main>
      <Footer />
    </div>
  );
};

export default SiteLayout;
