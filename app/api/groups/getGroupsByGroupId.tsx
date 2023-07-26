import prisma from "../../../lib/prisma";

const getGroupsByGroupId = async (groupId: string) => {
  const group = await prisma.group.findUnique({
    where: {
      id: groupId,
    },
  });

  return group;
};

export default getGroupsByGroupId;
