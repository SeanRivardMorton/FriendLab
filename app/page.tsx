import React, { Suspense } from "react";
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
import { getUserGroups } from "./api/groups/getUserGroups";
import { getUserFriends } from "./api/friends/getUserFriends";
import QuickFriends from "./friends/components/QuickFriends";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
  });

  if (!session?.user?.id) {
    return <>Not logged in</>;
  }

  const groupData = getUserGroups(session?.user?.id);
  const friendData = getUserFriends(session?.user?.id);

  const [groups, friends] = await Promise.all([groupData, friendData]);

  const baseUrl =
    process.env.NEXTAUTH_URL || "https://friendlab.co.uk/api/auth/signin";

  // ghetto way to get url
  const url = baseUrl.replace("api/auth/signin", "invite");

  return (
    <main>
      <ClientProtectedPage>
        <QuickGroups groups={groups} />
        <QuickFriends friends={friends} />
        <div className="bg-base-100 p-3 m-2 card">
          <h2 className="text-xl">Events</h2>
        </div>
      </ClientProtectedPage>
    </main>
  );
}
