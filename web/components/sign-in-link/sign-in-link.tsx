import React from 'react';
import Link from "next/link";
import { useRouter } from "next/router";

type SignInLinkProps = {
  className?: string;
};

const SignInLink: React.FC<SignInLinkProps> = ({ className, children = "Sign In"  }) => {
  const router = useRouter();

  return (
    <Link href={`/sign-in?returnLink=${router.asPath}`}>
      <a className={className}>
        {children}
      </a>
    </Link>
  );
};

export default SignInLink;
