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
import getEventsByUserId from "./api/events/getEventsByUserId";
import QuickEvents from "./components/QuickEvents";

export default async function Home() {
  const session = await getSession();

  if (!session?.user?.id) redirect("/login");

  if (!session?.user?.id) redirect(LOGIN_ROUTE);
  const groupsData = getGroupsByUserId(session?.user?.id);
  const eventsData = getEventsByUserId(session?.user?.id);

  const [groups, { created, attendee }] = await Promise.all([
    groupsData,
    eventsData,
  ]);

  return (
    <main>
      <div className="flex flex-col justify-between h-[89vh]">
        <FriendLabGroupSelect groups={groups} />
        {!created && !attendee && <NoEvents />}
        {(created || attendee) && <QuickEvents />}
        <BottomTray />
      </div>
    </main>
  );
}
