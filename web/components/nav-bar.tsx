import React from "react";
import Link from "next/link";

import Container from "./ui/layouts/container";
import Cluster from "./ui/layouts/cluster";
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
      <Container>
        <div className={styles.container}>
          <Cluster scale="6">
            <ul className={styles.list}>
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
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
          </Cluster>
        </div>
      </Container>
    </nav>
  );
};

export default NavBar;
