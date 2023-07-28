import React from "react";
import { getSession } from "./api/getSession";
import FriendLabGroupSelect from "./components/FriendLabGroupSelect";
import { getGroupsByUserId } from "./api/groups/getGroupsById";
import NoEvents from "./components/NoEvents";
import BottomTray from "./components/BottomTray";
import getEventsByUserId from "./api/events/getEventsByUserId";
import QuickEvents from "./components/QuickEvents";
import getCurrentUserFriends from "./api/friends/getCurrentUsetFriends";
import NoFriends from "./components/NoFriends";
import LandingPage from "./LandingPage/LandingPage";
import { BaseEvent } from "./api/events/getEventById";

const sortEventsByDate = (events: BaseEvent[]) =>
  events.sort(
    (a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf()
  );

const filterEventsByDate = (events: BaseEvent[]) => {
  const today = new Date();
  return events.filter(
    (event) => new Date(event.date).valueOf() >= today.valueOf()
  );
};

export default async function Home() {
  const session = await getSession();
  if (!session?.user?.id) return <LandingPage />;
  const groupsData = getGroupsByUserId(session?.user?.id);
  const friendsData = getCurrentUserFriends(session?.user?.id);

  const [groups, friends] = await Promise.all([groupsData, friendsData]);
  const events = await getEventsByUserId(
    session?.user?.id,
    groups.map((group) => group.id)
  );

  if (friends.length === 0) {
    return (
      <main>
        <div className="flex flex-col justify-between h-[89vh]">
          <FriendLabGroupSelect groups={groups} />
          <NoFriends />
          <BottomTray />
        </div>
      </main>
    );
  }

  const sortedEvents = sortEventsByDate(events);
  const filteredSortedEvents = filterEventsByDate(sortedEvents);
  console.log("fitlered", filteredSortedEvents);
  return (
    <main>
      <div className="flex flex-col justify-between h-[89vh]">
        <FriendLabGroupSelect groups={groups} />
        {events.length === 0 && <NoEvents />}
        {events.length > 0 && <QuickEvents event={filteredSortedEvents[0]} />}
        <BottomTray />
      </div>
    </main>
  );
}
