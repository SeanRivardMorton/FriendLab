import React from "react";
import { getSession } from "./api/getSession";
import FriendLabGroupSelect from "./components/FriendLabGroupSelect";
import { getGroupsByUserId } from "./api/groups/getGroupsById";
import NoEvents from "./components/NoEvents";
import BottomTray from "./components/BottomTray";
import getEventsByUserId, { Event } from "./api/events/getEventsByUserId";
import QuickEvents from "./components/QuickEvents";
import getCurrentUserFriends from "./api/friends/getCurrentUsetFriends";
import NoFriends from "./components/NoFriends";
import LandingPage from "./LandingPage/LandingPage";
import {
  CircleButtonLink,
  CircleButtonLinkInset,
} from "./components/Form/button";
import { CalendarIcon, ChevronRightIcon } from "@radix-ui/react-icons";

const sortEventsByDate = (events: Event[]) =>
  events.sort(
    (a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf()
  );

const unansweredEventRequest = (events: Event[]) =>
  events.filter((event) => event.eventResponse.length === 0);

export default async function Home() {
  const session = await getSession();
  if (!session?.user?.id) return <LandingPage />;
  const groupsData = getGroupsByUserId(session?.user?.id);
  const friendsData = getCurrentUserFriends(session?.user?.id);

  const [groups, friends] = await Promise.all([groupsData, friendsData]);
  const events = await getEventsByUserId(session?.user?.id, {
    groupIds: groups.map((group) => group.id),
  });

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

  if (unanswerEvents.length === 0)
    return (
      <>
        <div className="flex flex-col justify-between h-[89vh]">
          <FriendLabGroupSelect groups={groups} />
          <div className="flex flex-row justify-center">
            <CircleButtonLink href="/events">
              <ChevronRightIcon className="h-8 w-8" />
            </CircleButtonLink>
          </div>
          <BottomTray />
        </div>
      </>
    );

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
