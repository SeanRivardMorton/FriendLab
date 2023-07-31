import prisma from "../../../../../../lib/prisma";

const putUserEventResponse = async (userId, eventId, response) => {
  console.log(userId, eventId, response);
  const upsertedResponse = await prisma.eventResponse.upsert({
    where: {
      userId_eventId: {
        userId: userId,
        eventId: eventId,
      },
    },
    update: {
      response: response,
    },
    create: {
      userId: userId,
      eventId: eventId,
      response: response,
    },
  });

  return upsertedResponse;
};

export default putUserEventResponse;
