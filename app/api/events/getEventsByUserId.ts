import { Prisma } from "@prisma/client";
import prisma from "../../../lib/prisma";

// {
//   where: {
//     creatorId: userId,
//     groupId: {
//       in: options.groupIds,
//     },
//     attendees: {
//       some: {
//         id: userId,
//       },
//     },
//   },
//   include: {
//     attendees: true,
//     group: true,
//     creator: true,
//     eventResponse: {
//       where: {
//         userId,
//       },
//     },
//   },
// });

const getEventsByUserId = async (
  userId: string,
  options?: { groupIds: string[] }
) => {
  const createdEvents = await prisma.event.findMany({
    where: {
      creatorId: userId,
      groupId: {
        in: options?.groupIds,
      },
    },
    include: {
      attendees: true,
      group: true,
      creator: true,
      eventResponse: {
        where: {
          userId,
        },
      },
    },
  });

  console.log(createdEvents);

  return createdEvents;
};

export default getEventsByUserId;

export type Event = Prisma.EventGetPayload<{
  include: {
    attendees: true;
    group: true;
    eventResponse: true;
  };
}>;
