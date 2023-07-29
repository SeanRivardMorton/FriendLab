"use client";
import { ExitIcon } from "@radix-ui/react-icons";
import { signOut } from "next-auth/react";

const SignOutButton = () => {
  return (
    <button
      onClick={() => signOut()}
      className="btn btn-circle bg-base-100 text-error"
    >
      <ExitIcon className="h-8 w-8" />
    </button>
  );
};

export default SignOutButton;
