import { redirect } from "next/navigation";
import React from "react";

import prisma from "../../../lib/prisma";
import { getSession } from "../../api/getSession";
import { LOGIN_ROUTE } from "../../constants";
import { AsyncReturnType } from "../../utils/AsyncReturnType";
import ClientEventPage from "./client";

export type EventType = AsyncReturnType<typeof fetchEvent>;

const fetchEvent = async (id) => {
  const event = await prisma.event.findUnique({
    where: {
      id: id,
    },
    include: {
      poll: {
        include: {
          options: {
            include: {
              _count: {
                select: {
                  pollVote: true,
                },
              },
              pollVote: true,
            },
          },
        },
      },
      attendees: {
        include: {
          eventResponse: {
            where: {
              eventId: id,
            },
          },
        },
      },
      creator: true,
      group: {
        include: {
          members: true,
        },
      },
      eventResponse: {
        include: {
          user: true,
        },
      },
    },
  });

  return event;
};

const getEvent = async (id): Promise<EventType> => {
  const event: EventType = await fetchEvent(id);

  if (!event) return null;
  return event;
};

const Home = async ({ params }) => {
  const session = await getSession();

  if (!session?.user?.id) {
    return redirect(LOGIN_ROUTE);
  }

  const event = await getEvent(params.id);

  if (!event) return <>Could not find</>;

  return (
    <main>
      <ClientEventPage event={event} />
    </main>
  );
};

export default Home;
