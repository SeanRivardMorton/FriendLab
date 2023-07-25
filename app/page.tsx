import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";

import { redirect } from "next/navigation";
import { LOGIN_ROUTE } from "./constants";
import FriendLabPoll from "./components/FriendLabPoll";
import FriendLabHeader from "./components/FriendLabHeader";
import FriendLabThreads from "./components/FriendLabThreads";
import { getSession } from "./api/getSession";
import FriendLabGroupSelect from "./components/FriendLabGroupSelect";
import { getGroupsByUserId } from "./api/groups/getGroupsById";
import NoEvents from "./components/NoEvents";
import BottomTray from "./components/BottomTray";

export default async function Home() {
  const session = await getSession();

  if (!session?.user?.id) redirect("/login");

  if (!session?.user?.id) redirect(LOGIN_ROUTE);
  const groups = await getGroupsByUserId(session?.user?.id);

  return (
    <main>
      <div className="flex flex-col justify-between h-[89vh]">
        <FriendLabGroupSelect groups={groups} />
        <NoEvents />
        <BottomTray />
      </div>
    </main>
  );
}
