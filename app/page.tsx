import { CalendarIcon, PersonIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import React from "react";

import prisma from "../lib/prisma";
import { getSession } from "./api/getSession";
import Avatar from "./components/Avatar";
import BottomTray from "./components/BottomTray";
import ButtonTray from "./components/ButtonTray";
import { CircleButtonLink } from "./components/Form/button";
import QuickEvents from "./components/QuickEvents";
import EventsList from "./events/EventsList";
import LandingPage from "./LandingPage/LandingPage";
import { kv } from "@vercel/kv";

const userWithEvents = async (userId) => {
  const cachedUser = await kv.get(userId);
  if (cachedUser) {
    return cachedUser;
  }
  const res = await prisma.user.findUnique({
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

  // cache the users events
  await kv.set(`user:${userId}`, JSON.stringify(res), {
    ex: 100,
    nx: true,
  });

  return res;
};

export default async function Home() {
  const session = await getSession();
  if (!session?.user) return <LandingPage />;

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
        backSlot={
          <div className="h-10 w-10 rounded-full bg-base-100">
            <Image
              className="m-auto rotate-12"
              src="/vial.svg"
              height={22}
              width={22}
              alt="logo"
            />
          </div>
        }
        actionSlot={
          <Avatar
            className="ml-8 border-2 border-base-300"
            src={user?.image ?? undefined}
          />
        }
        secondarySlot={
          <div className="flex flex-row justify-between">
            <div className="mr-2 flex flex-col justify-center">
              <CircleButtonLink href="/events">
                <CalendarIcon className="h-8 w-8" />
              </CircleButtonLink>
              <p className="mx-auto">Events</p>
            </div>
            <div className="flex flex-col justify-center">
              <CircleButtonLink href="/groups">
                <PersonIcon className="h-8 w-8" />
              </CircleButtonLink>
              <p className="mx-auto">Groups</p>
            </div>
          </div>
        }
      >
        <div>
          <h2>Home</h2>
        </div>
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
        {/* <p className="my-auto text-lg">New Event</p>
        <CircleButtonLinkInset href="/events/create">
          <PlusIcon className="h-8 w-8" />
        </CircleButtonLinkInset> */}
      </BottomTray>
    </main>
  );
}
