import React from "react";
import Link from "next/link";

const Header: React.FC = () => {
  const nowDate = new Date();

  return (
    <header>
      <div>
        <Link href="/">
          <a>{nowDate.toLocaleDateString()}</a>
        </Link>

        <Link href="/">
          <a>IT Dog</a>
        </Link>

        <div />
      </div>
    </header>
  );
};

export default Header;
