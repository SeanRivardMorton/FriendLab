import React from "react";
import { getServerSession } from "next-auth/next";
import ClientProtectedPage from "./protected/client/page";
import CopyLink from "./components/CopyLink";
import { authOptions } from "./api/auth/[...nextauth]";
import prisma from "../lib/prisma";
import Image from "next/image";
import {
  CalendarIcon,
  LightningBoltIcon,
  MagnifyingGlassIcon,
  PersonIcon,
  PlayIcon,
  ReaderIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import QuickGroups from "./groups/components/QuickGroups";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
  });

  const friends =
    user &&
    (await prisma.friendship.findMany({
      where: {
        userId: user.id,
      },
      include: {
        friend: true,
      },
    }));

  const baseUrl =
    process.env.NEXTAUTH_URL || "https://friendlab.co.uk/api/auth/signin";

  // ghetto way to get url
  const url = baseUrl.replace("api/auth/signin", "invite");

  return (
    <main>
      <ClientProtectedPage>
        <QuickGroups />
        <div className="bg-base-100 p-3 m-2 card">
          <h2 className="text-xl">Feed</h2>
        </div>
        {/* <div className="bg-base-100 p-3 m-2 card">
          <h2 className="text-xl">Friends</h2>
        </div> */}
        {/* <div className="bg-base-100 p-3 m-2 card">
          <h2 className="text-xl">Hangouts</h2>
        </div> */}
        {/* <div className="bg-base-100 p-3 m-2 card">
          <h2 className="text-xl">Time</h2>
        </div> */}
      </ClientProtectedPage>
    </main>
  );
}
