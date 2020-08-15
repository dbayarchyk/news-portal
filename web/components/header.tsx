import React from "react";
import Link from "next/link";

import BodyText from "./ui/body-text";
import Logo from "./logo";
import styles from "./header.module.scss";

const Header: React.FC = () => {
  const nowDate = new Date();

  return (
    <header className={styles.header}>
      <div className={`layout-container ${styles.headerContent}`}>
        <div className={styles.headerContentLeft}>
          <BodyText type="secondary">
            <Link href="/">
              <a className={styles.dateLink}>{nowDate.toLocaleDateString()}</a>
            </Link>
          </BodyText>
        </div>

        <div className={styles.headerContentRight}>
          <Link href="/">
            <a className={styles.logoLink}>
              <Logo />
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
