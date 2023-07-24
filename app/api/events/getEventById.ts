import { Prisma } from "@prisma/client";
import prisma from "../../../lib/prisma";

export const getEventById = (id) => {
  const event = prisma.event.findUnique({
    where: {
      id: id[0],
    },
    include: {
      creator: true,
      attendees: true,
    },
  });
  return event;
};

export type EventWithAttendees = Prisma.EventGetPayload<{
  include: {
    attendees: true;
    creator: true;
  };
}>;
