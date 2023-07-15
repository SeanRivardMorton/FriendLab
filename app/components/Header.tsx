"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const Header = () => {
  const { data, status } = useSession();
  const router = useRouter();

  console.log(status);

  return (
    <div className="navbar bg-base-100">
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Friend Lab</a>
      </div>
      <div className="flex-none">
        {status === "loading" && (
          <span className="loading loading-spinner loading-sm"></span>
        )}
        {status === "authenticated" && (
          <button
            onClick={() => signOut()}
            className="btn btn-square btn-ghost"
          >
            <Image
              className="rounded-md"
              alt="logo"
              src={data?.user?.image || ""}
              width={48}
              height={48}
            />
          </button>
        )}
        {status === "unauthenticated" && (
          <button
            onClick={() => router.push("/api/auth/signin")}
            className="btn btn-square btn-ghost"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};
