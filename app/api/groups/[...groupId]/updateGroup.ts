import prisma from "../../../../lib/prisma";

export const updateGroup = async ({ groupId, friendId }) => {
  const updatedGroup = await prisma.group.update({
    where: {
      id: groupId,
    },
    data: {
      members: {
        connect: {
          id: friendId,
        },
      },
    },
  });

  return updatedGroup;
};
