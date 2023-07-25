"use client";

import { ExitIcon, GearIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

interface TopNavProps {
  avatar?: string;
}

const TopNav: React.FC<TopNavProps> = ({ avatar }) => {
  const router = useRouter();
  return (
    <div className="text-4xl m-2 w-screen text-primary bg-base-black flex flex-row justify-between">
      <Link href="/">FriendLab</Link>

      <div className="bg-base-200 rounded-full mr-4">
        <button className="btn btn-circle">
          <GearIcon
            onClick={() => router.push("/settings")}
            className="h-6 w-6"
          />
        </button>
      </div>
    </div>
  );
};

export default TopNav;
