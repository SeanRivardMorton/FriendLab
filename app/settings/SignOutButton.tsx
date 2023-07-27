"ues client";
import { ArrowRightIcon, ExitIcon, RocketIcon } from "@radix-ui/react-icons";
import { signOut } from "next-auth/react";
import Link from "next/link";

const SignOutButton = () => {
  return (
    <div className="flex flex-row justify-end">
      <div className="card card-compact mt-4 bg-base-200 w-fit rounded-l-full">
        <div className="card-body">
          <div className="card-title flex flex-row justify-end">
            <h1>Sign out</h1>
            <Link
              href="/api/auth/signin"
              className="btn btn-circle bg-base-100 text-error animate-pulse shadow-md shadow-error"
            >
              <ExitIcon className="h-8 w-8" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignOutButton;

// <button onClick={() => signOut()} className="btn btn-error">
//   Logout
//   <ExitIcon className="h-6 w-6" />
// </button>
