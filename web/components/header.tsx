import React from "react";
import Link from "next/link";

import styles from "./header.module.scss";

const Header: React.FC = () => {
  const nowDate = new Date();

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.headerContentLeft}>
          <Link href="/">
            <a>{nowDate.toLocaleDateString()}</a>
          </Link>
        </div>

        <div className={styles.headerContentRight}>
          <Link href="/">
            <a>IT Dog</a>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
