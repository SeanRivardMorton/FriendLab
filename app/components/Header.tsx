"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Dropdown from "./menu";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import Vial from "../assets/vial.svg";
import { LOGIN_ROUTE } from "../constants";

export const Header = () => {
  const { data, status } = useSession();
  const router = useRouter();

  return (
    <div className="navbar bg-base-100">
      <div className="flex-none">
        <Dropdown />
      </div>
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          <Image
            className="m-auto my-4 rotate-12"
            width={12}
            height={12}
            alt="vial"
            src={Vial}
          />
          Friend Lab
        </Link>
      </div>
      <div className="flex-none">
        {status === "loading" && (
          <span className="loading loading-spinner loading-sm"></span>
        )}
        {status === "authenticated" && (
          <>
            <Link href="/notifications">
              <EnvelopeClosedIcon className="mr-4 h-4 w-4" />
            </Link>
            <Link href="/profile">
              <Image
                width={44}
                height={44}
                alt="logo"
                src={data?.user?.image || ""}
                className="rounded-md h-8 w-8"
              />
            </Link>
          </>
        )}
        {status === "unauthenticated" && (
          <button
            onClick={() => router.push(LOGIN_ROUTE)}
            className="btn btn-square btn-ghost"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};
