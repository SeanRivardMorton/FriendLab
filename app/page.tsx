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
import { CircleButtonLinkInset } from "./components/Form/button";
import { CalendarIcon } from "@radix-ui/react-icons";

const sortEventsByDate = (events: BaseEvent[]) =>
  events.sort(
    (a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf()
  );

const unansweredEventRequest = (events: BaseEvent[]) =>
  events.filter((event) => event.eventResponse.length === 0);

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
  const unanswerEvents = unansweredEventRequest(sortedEvents);
  // console.log(unansweredEventRequest(sortedEvents));

  return (
    <main>
      <div className="flex flex-col justify-between h-[89vh]">
        <FriendLabGroupSelect groups={groups} />
        {events.length === 0 && <NoEvents />}
        {events.length > 0 && (
          <QuickEvents
            userId={session?.user?.id}
            events={unanswerEvents}
            initialIndex={0}
          />
        )}
        <BottomTray>
          <CircleButtonLinkInset href="/calendar">
            <CalendarIcon className="h-8 w-8" />
          </CircleButtonLinkInset>
        </BottomTray>
      </div>
    </main>
  );
}
