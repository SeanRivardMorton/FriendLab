import { Prisma } from "@prisma/client";

import prisma from "../../../lib/prisma";
import { AsyncReturnType } from "../../utils/AsyncReturnType";

export type EventType = Prisma.EventGetPayload<{
  include: {
    poll: {
      include: {
        options: true;
      };
    };
    eventResponse: true;
    attendees: true;
    group: true;
    creator: true;
  };
}>;

const getEventById = async (eventId: string) => {
  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
    include: {
      poll: {
        include: {
          options: true,
        },
      },
      eventResponse: true,
      attendees: true,
      group: true,
      creator: true,
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

export type BaseEvent = Prisma.EventGetPayload<{
  include: {
    eventResponse: true;
  };
}>;
