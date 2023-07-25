import prisma from "../../../../lib/prisma";

export const deleteGroup = async ({ groupId }) => {
  const updatedGroup = await prisma.group.delete({
    where: {
      id: groupId,
    },
  });
  return updatedGroup;
};
