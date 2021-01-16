import React from "react";
import Link from "next/link";

import Container from "./ui/layouts/container";
import Cluster from "./ui/layouts/cluster";
import Switcher from "./ui/layouts/switcher";
import UserMenu from './user-menu';
import styles from "./nav-bar.module.scss";

const NAV_ITEMS = [
  {
    title: "Home",
    href: "/",
  },
  // {
  //   title: "Jobs",
  //   href: "/jobs",
  // },
  // {
  //   title: "Events",
  //   href: "/events",
  // },
  // {
  //   title: "Salaries",
  //   href: "/salaries",
  // },
  // {
  //   title: "About",
  //   href: "/about",
  // },
];

const NavBar: React.FC = () => {
  const stickyNavQualifierRef = React.useRef<HTMLDivElement>(null);
  const navRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (
      typeof IntersectionObserver !== "function" ||
      !stickyNavQualifierRef.current
    ) {
      return;
    }

    const observer = new IntersectionObserver((records) => {
      for (const record of records) {
        if (record.isIntersecting) {
          navRef.current.classList.remove(styles.sticky);
        } else {
          navRef.current.classList.add(styles.sticky);
        }
      }
    });

    observer.observe(stickyNavQualifierRef.current);

    return () => {
      observer.unobserve(stickyNavQualifierRef.current);
    };
  }, []);

  return (
    <>
      <div className={styles.stickyNavQualifier} ref={stickyNavQualifierRef} />
      <nav className={styles.nav} ref={navRef}>
        <Container>
          <div className={styles.container}>
            <Switcher scale="6" threshold={20}>
              <div>
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

                <div className={styles.menuContainer}>
                  <UserMenu />
                </div>
              </div>
            </Switcher>
          </div>
        </Container>
      </nav>
    </>
  );
};

export default NavBar;
