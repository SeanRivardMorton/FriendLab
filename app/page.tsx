import { CalendarIcon, PersonIcon, PlusIcon } from "@radix-ui/react-icons";
import React from "react";

import prisma from "../lib/prisma";
import { getSession } from "./api/getSession";
import BottomTray from "./components/BottomTray";
import ButtonTray from "./components/ButtonTray";
import { CircleButtonLinkInset } from "./components/Form/button";
import QuickEvents from "./components/QuickEvents";
import EventsList from "./events/EventsList";
import LandingPage from "./LandingPage/LandingPage";

const userWithEvents = async (userId) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      eventsCreated: {
        include: {
          creator: true,
          eventResponse: {
            where: {
              userId,
            },
            include: {
              user: true,
            },
          },
        },
      },
      eventsAttending: {
        include: {
          creator: true,
          eventResponse: {
            where: {
              userId,
            },
            include: {
              user: true,
            },
          },
        },
      },
    },
  });
};

export default async function Home() {
  const session = await getSession();
  if (!session) return <LandingPage />;

  const user = await userWithEvents(session?.user?.id);

  if (!user) return <></>;

  const { eventsAttending } = user;
  const events = eventsAttending;

  const unansweredEvents = events.filter(
    (event) =>
      event.eventResponse.length === 0 ||
      event.eventResponse.filter(
        (response) => response.user.id === session?.user?.id,
      ).length === 0,
  );

  return (
    <main>
      <ButtonTray
        actionSlot={
          <>
            <CircleButtonLinkInset href="/events">
              <CalendarIcon className="h-8 w-8" />
            </CircleButtonLinkInset>
            <CircleButtonLinkInset href="/groups">
              <PersonIcon className="h-8 w-8" />
            </CircleButtonLinkInset>
          </>
        }
      >
        <h2>Home</h2>
      </ButtonTray>
      {/* {events.length === 0 && <></>} */}
      {unansweredEvents.length > 0 ? (
        <QuickEvents
          userId={session?.user?.id}
          events={unansweredEvents}
          initialIndex={0}
        />
      ) : (
        <EventsList events={events} />
      )}
      <BottomTray>
        <p className="my-auto text-lg">New Event</p>
        <CircleButtonLinkInset href="/events/create">
          <PlusIcon className="h-8 w-8" />
        </CircleButtonLinkInset>
      </BottomTray>
    </main>
  );
}
