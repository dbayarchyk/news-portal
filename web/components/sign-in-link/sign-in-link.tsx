import React from 'react';
import Link from "next/link";
import { useRouter } from "next/router";

type SignInLinkProps = {
  className?: string;
};

const SignInLink: React.FC<SignInLinkProps> = ({ className }) => {
  const router = useRouter();

  return (
    <Link href={`/sign-in?returnLink=${router.asPath}`}>
      <a className={className}>
        Sign In
      </a>
    </Link>
  );
};

export default SignInLink;
