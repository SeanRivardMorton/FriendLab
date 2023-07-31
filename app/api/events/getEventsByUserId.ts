import prisma from "../../../lib/prisma";

const getEventsByUserId = async (userId: string, groupId: string[]) => {
  const createdEvents = prisma.event.findMany({
    where: {
      OR: [
        {
          groupId: {
            in: groupId,
          },
        },
        {
          creatorId: userId,
        },
        {
          attendees: {
            some: {
              id: userId,
            },
          },
        },
      ],
    },
    include: {
      eventResponse: {
        where: {
          userId,
        },
      },
    },
  });

  return createdEvents;
};

export default getEventsByUserId;
