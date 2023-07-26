import prisma from "../../../lib/prisma";
import { getSession } from "../getSession";

const createGroup = async (data) => {
  const session = await getSession();
  if (!session?.user?.id) return;
  const createdGroup = await prisma.group.create({
    data: {
      name: data.name,
      description: data.description,
      creatorId: session?.user?.id,
    },
  });
  return createdGroup;
};

export default createGroup;
