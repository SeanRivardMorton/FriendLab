import prisma from "../../../lib/prisma";

export const UpdateEvent = async (event) => {
  const updatedEvent = await prisma.event.update({
    where: {
      id: event.id,
    },
    data: {
      name: event.name,
      description: event.description,
      location: event.location,
      attendees: {
        connect: event.attendees.map((attendee) => ({ id: attendee.id })),
      },
    },
  });
  return updatedEvent;
};
