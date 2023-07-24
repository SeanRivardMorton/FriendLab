import prisma from "../../../lib/prisma";

export const getUserEvents = async (userId: string) => {
  const eventsData = prisma.event.findMany({
    where: {
      creatorId: userId,
    },
  });
  const attendingData = prisma.event.findMany({
    where: {
      attendees: {
        some: {
          id: userId,
        },
      },
    },
  });

  const [events, attending] = await Promise.all([eventsData, attendingData]);

  return [...events, ...attending];
};
