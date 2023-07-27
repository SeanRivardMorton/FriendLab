import prisma from "../../../lib/prisma";
import { getSession } from "../getSession";

const createGroup = async (data) => {
  const session = await getSession();
  if (!session?.user?.id || !session?.user?.name) return;

  const memberFirstNames = data.members
    .map((member) => member.name.split(" ")[0])
    .slice(0, 3)
    .join(", ");

  const userFirstName = session?.user?.name.split(" ")[0];

  const createdGroup = await prisma.group.create({
    data: {
      name: `${userFirstName}, ${memberFirstNames}`,
      members: {
        connect: data.members.map((member) => ({ id: member.id })),
      },
      creatorId: session?.user?.id,
    },
  });
  return createdGroup;
};

export default createGroup;
