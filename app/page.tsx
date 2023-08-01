import React from "react";
import { getSession } from "./api/getSession";
import QuickEvents from "./components/QuickEvents";
import LandingPage from "./LandingPage/LandingPage";
import { CircleButtonLinkInset } from "./components/Form/button";
import { CalendarIcon, PersonIcon } from "@radix-ui/react-icons";
import prisma from "../lib/prisma";
import ButtonTray from "./components/ButtonTray";
import BottomTray from "./components/BottomTray";
import EventsList from "./events/EventsList";

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

  const { eventsCreated, eventsAttending } = user;
  const events = [...eventsAttending, ...eventsCreated];

  const unansweredEvents = events.filter(
    (event) =>
      event.eventResponse.length === 0 ||
      event.eventResponse.filter(
        (response) => response.user.id === session?.user?.id
      ).length === 0
  );

  console.log(unansweredEvents);

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
      {unansweredEvents.length > 0 ? (
        <QuickEvents
          userId={session?.user?.id}
          events={unansweredEvents}
          initialIndex={0}
        />
      ) : (
        <EventsList events={events} />
      )}
    </main>
  );
}
