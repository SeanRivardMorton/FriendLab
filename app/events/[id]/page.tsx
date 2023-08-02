import { redirect } from "next/navigation";
import React from "react";

import prisma from "../../../lib/prisma";
import { getSession } from "../../api/getSession";
import { LOGIN_ROUTE } from "../../constants";
import { AsyncReturnType } from "../../utils/AsyncReturnType";
import ClientEventPage from "./client";

const getEvent = async (id) => {
  const event = await prisma.event.findUnique({
    where: {
      id: id,
    },
    include: {
      attendees: {
        include: {
          eventResponse: true,
        },
      },
      creator: true,
      group: true,
      eventResponse: {
        include: {
          user: true,
        },
      },
    },
  });
  const filterAttendeesEventResponse = event?.attendees.map((attendee) => {
    const eventResponse = attendee.eventResponse.filter(
      (response) => response.eventId === event?.id,
    );
    return {
      ...attendee,
      eventResponse: eventResponse,
    };
  });

  return { ...event, attendees: filterAttendeesEventResponse };
};

export type EventType = AsyncReturnType<typeof getEvent>;

const Home = async ({ params }) => {
  const session = await getSession();

  if (!session?.user?.id) {
    return redirect(LOGIN_ROUTE);
  }

  const event = await getEvent(params.id);
  if (!event) return <>Could not find</>;
  return (
    <main>
      <ClientEventPage userId={session.user.id} event={event} />
    </main>
  );
};

export default Home;
