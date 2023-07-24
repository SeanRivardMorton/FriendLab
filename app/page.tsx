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
import { getUserEvents } from "./api/events/getUserEvents";
import QuickEvents from "./events/QuickEvents";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return <>Not logged in</>;
  }

  const groupData = getUserGroups(session?.user?.id);
  const friendData = getUserFriends(session?.user?.id);
  const eventData = getUserEvents(session?.user?.id);

  const [groups, friends, events] = await Promise.all([
    groupData,
    friendData,
    eventData,
  ]);

  const baseUrl =
    process.env.NEXTAUTH_URL || "https://friendlab.co.uk/api/auth/signin";

  // ghetto way to get url
  const url = baseUrl.replace("api/auth/signin", "invite");

  return (
    <main>
      <ClientProtectedPage>
        <QuickGroups groups={groups} />
        <QuickFriends friends={friends} />
        <QuickEvents events={events} />
      </ClientProtectedPage>
    </main>
  );
}
