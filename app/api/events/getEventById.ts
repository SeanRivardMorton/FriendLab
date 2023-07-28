import { Prisma } from "@prisma/client";
import prisma from "../../../lib/prisma";

const getEventById = async (eventId: string) => {
  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
    include: {
      attendees: true,
      group: true,
    },
  });
  return event;
};

export default getEventById;

export type Event = Prisma.EventGetPayload<{
  include: {
    attendees: true;
    group: true;
  };
}>;

export type BaseEvent = Prisma.EventGetPayload<{}>;
