import React from "react";

import Header from "./header";
import NavBar from "./nav-bar";
import Footer from "./footer";
import Container from "./ui/layouts/container";
import Stack from "./ui/layouts/stack";
import styles from "./site-layout.module.scss";

const SiteLayout: React.FC = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header />
      <Stack scale="8">
        <NavBar />
        <main>
          <Container>{children}</Container>
        </main>
        <Footer />
      </Stack>
    </div>
  );
};

export default SiteLayout;
