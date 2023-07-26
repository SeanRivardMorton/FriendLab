import prisma from "../../../lib/prisma";

const addGroupMember = async (groupId: string, userId: string) => {
  const response = await prisma.group.update({
    where: {
      id: groupId,
    },
    data: {
      members: {
        connect: {
          id: userId,
        },
      },
    },
  });
  return response;
};

export default addGroupMember;
