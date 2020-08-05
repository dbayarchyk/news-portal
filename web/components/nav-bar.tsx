import React from "react";
import Link from "next/link";

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
      <ul>
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>
              <a
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
