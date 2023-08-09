import prisma from "../../../../lib/prisma";
import { EventFormType } from "../../../events/[id]/edit/useEventSettings";

const updateEventPoll = async (id, data: EventFormType) => {
  console.log("What is events", data);
  const firstPoll = data.poll[0];
  if (!firstPoll.options) return null;
  const res = await prisma.event.update({
    where: {
      id: id,
    },
    data: {
      poll: {
        create: {
          question: firstPoll.question || "",
          options: {
            create: [
              ...firstPoll.options.map((option) => ({
                text: option.text || "",
              })),
            ],
          },
        },
      },
    },
    include: {
      poll: {
        include: {
          options: true,
        },
      },
    },
  });

  return {
    status: 200,
    body: res,
  };
};

export default updateEventPoll;
