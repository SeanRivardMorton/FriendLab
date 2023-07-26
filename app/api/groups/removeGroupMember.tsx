import prisma from "../../../lib/prisma";

const removeGroupMember = async (groupId: string, userId: string) => {
  const response = await prisma.group.update({
    where: {
      id: groupId,
    },
    data: {
      members: {
        disconnect: {
          id: userId,
        },
      },
    },
  });
  return response;
};

export default removeGroupMember;
