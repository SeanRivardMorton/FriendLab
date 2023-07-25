"use client";
import {
  AvatarIcon,
  ExitIcon,
  GearIcon,
  HomeIcon,
} from "@radix-ui/react-icons";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

type Page = {
  name: string;
  href?: string;
  icon: React.ReactNode;
  onClick?: () => void;
};

const pages: Page[] = [
  {
    name: "Home",
    href: "/",
    icon: <HomeIcon className="h-8 w-8" />,
  },
  {
    name: "Friends",
    href: "/friends",
    icon: <AvatarIcon className="h-8 w-8" />,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: <GearIcon className="h-8 w-8" />,
  },
  {
    name: "Sign Out",
    icon: <ExitIcon className="h-8 w-8" />,
    onClick: () => signOut(),
  },
];

const TopNav = ({ children }) => {
  const { data, status } = useSession();
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar bg-base-100">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <Link href="/" className="flex-1 px-2 mx-2 text-2xl">
            Friend Lab
          </Link>

          <Link href="/profile">
            <img
              alt="logo"
              src={data?.user?.image || ""}
              className="rounded-md h-8 w-8"
            />
          </Link>
          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal">
              {/* Navbar menu content here */}
              <li>
                <a>Navbar Item 1</a>
              </li>
              <li>
                <a>Navbar Item 2</a>
              </li>
            </ul>
          </div>
        </div>
        {/* Page content here */}
        {children}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-100">
          {pages.map((page) => {
            return (
              <li
                onClick={page?.onClick}
                key={page.name}
                className="flex flex-row"
              >
                {page?.href ? (
                  <Link href={page?.href}>
                    <div className="h-8 w-8">{page.icon}</div>
                    {page.name}
                  </Link>
                ) : (
                  <div>
                    <div className="h-8 w-8">{page.icon}</div>
                    {page.name}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TopNav;
