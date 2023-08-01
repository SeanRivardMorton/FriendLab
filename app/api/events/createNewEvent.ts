import prisma from "../../../lib/prisma";
import { getSession } from "../getSession";

const createNewEvent = async (event) => {
  const session = await getSession();
  if (!session?.user?.id) throw new Error("Not authenticated");
  const res = await prisma.event.create({
    data: {
      ...event,
      date: new Date(event.date).toJSON(),
      creatorId: session.user.id,
      attendees: {
        connect: event.attendees,
      },
    },
  });
  return res;
};

export default createNewEvent;
