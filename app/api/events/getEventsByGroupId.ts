import prisma from "../../../lib/prisma";

const getEventsByGroupId = async (groupId: string) => {
  const events = await prisma.event.findMany({
    where: {
      groupId: groupId,
    },
  });
  return events;
};

export default getEventsByGroupId;
