import React from "react";
import Link from "next/link";

import styles from "./nav-bar.module.scss";

const NAV_ITEMS = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Jobs",
    href: "/jobs",
  },
  {
    title: "Events",
    href: "/events",
  },
  {
    title: "Salaries",
    href: "/salaries",
  },
  {
    title: "About",
    href: "/about",
  },
];

const NavBar: React.FC = () => {
  return (
    <nav>
      <ul className={`layout-container ${styles.list}`}>
        {NAV_ITEMS.map((item) => (
          <li className={styles.listItem} key={item.href}>
            <Link href={item.href}>
              <a
                className={styles.link}
                //   aria-current={segment === item.href ? "page" : undefined}
              >
                {item.title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
