import React from "react";

import Container from "../ui/layouts/container";
import styles from "./footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <Container>Footer</Container>
    </footer>
  );
};

export default Footer;
