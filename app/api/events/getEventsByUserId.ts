import prisma from "../../../lib/prisma";

const getEventsByUserId = async (userId: string) => {
  const createdEvents = prisma.event.findMany({
    where: {
      creatorId: userId,
    },
  });

  const attendeeEvents = prisma.event.findMany({
    where: {
      attendees: {
        some: {
          id: userId,
        },
      },
    },
  });

  const [created, attendee] = await Promise.all([
    createdEvents,
    attendeeEvents,
  ]);

  return { created, attendee };
};

export default getEventsByUserId;
