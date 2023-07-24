import prisma from "../../../lib/prisma";

export const getUserGroups = async (userId: string) => {
  const groups = await prisma.group.findMany({
    where: {
      creatorId: userId,
    },
    include: {
      members: true,
    },
  });
  return groups;
};
