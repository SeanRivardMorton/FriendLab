import prisma from "../../../lib/prisma";

export const getUserEvents = async (userId: string) => {
  const events = await prisma.event.findMany({
    where: {
      creatorId: userId,
    },
  });
  return events;
};
