"use client";

import { useRouter } from "next/navigation";

const SignInButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/api/auth/signin")}
      className="btn btn-primary mt-4"
    >
      Sign Up
    </button>
  );
};

export default SignInButton;
