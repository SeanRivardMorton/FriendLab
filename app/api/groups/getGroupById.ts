import prisma from "../../../lib/prisma";

export const getGroupById = async (groupId: string) => {
  const group = await prisma.group.findUnique({
    where: {
      id: groupId,
    },
    include: {
      members: true,
      creator: true,
    },
  });
  return group;
};
