import React, { Suspense } from "react";
import { getServerSession } from "next-auth/next";
import ClientProtectedPage from "./protected/client/page";
import { authOptions } from "./api/auth/[...nextauth]";
import QuickGroups from "./groups/components/QuickGroups";
import { getUserGroups } from "./api/groups/getUserGroups";
import { getUserFriends } from "./api/friends/getUserFriends";
import QuickFriends from "./friends/components/QuickFriends";
import { getUserEvents } from "./api/events/getUserEvents";
import QuickEvents from "./events/QuickEvents";
import { redirect } from "next/navigation";
import { LOGIN_ROUTE } from "./constants";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect(LOGIN_ROUTE);
  }

  const groupData = getUserGroups(session?.user?.id);
  const friendshipData = getUserFriends(session?.user?.id);
  const eventData = getUserEvents(session?.user?.id);

  const [groups, friendship, events] = await Promise.all([
    groupData,
    friendshipData,
    eventData,
  ]);

  //
  const friends = friendship.map((f) => f.friend);

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
