import prisma from "../../../lib/prisma";

const deleteGroupById = async (groupId) => {
  const deletedGroup = await prisma.group.delete({
    where: {
      id: groupId,
    },
  });
  return deletedGroup;
};

export default deleteGroupById;
