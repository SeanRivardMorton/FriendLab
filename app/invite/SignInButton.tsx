"use client";

import { useRouter } from "next/navigation";
import { LOGIN_ROUTE } from "../constants";

const SignInButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(LOGIN_ROUTE)}
      className="btn btn-primary mt-4"
    >
      Sign Up
    </button>
  );
};

export default SignInButton;
