import prisma from "../../../lib/prisma";

const getGroupsByGroupId = async (groupId: string) => {
  try {
    const group = await prisma.group.findUnique({
      where: {
        id: groupId,
      },
      include: {
        members: true,
      },
    });

    return group;
  } catch (e) {
    return null;
  }
};

export default getGroupsByGroupId;
