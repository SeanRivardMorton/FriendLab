import prisma from "../../../lib/prisma";

export const editEventsById = (id: string) => {
  const res = prisma.event.update({
    where: {
      id: id,
    },
    data: {
      name: "New Event Name",
    },
  });

  return res;
};
