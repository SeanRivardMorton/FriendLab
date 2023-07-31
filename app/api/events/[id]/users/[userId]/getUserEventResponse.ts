import { Prisma } from "@prisma/client";
import prisma from "../../../../../../lib/prisma";

const getUserEventResponse = async (userId, eventId) => {
  const userResponse = await prisma.eventResponse.findUnique({
    where: {
      userId_eventId: {
        userId: userId,
        eventId: eventId,
      },
    },
  });

  return userResponse;
};

export default getUserEventResponse;

export type UserEventResponse = Prisma.EventResponseGetPayload<{}>;
