import prisma from "../../../lib/prisma";

const updateGroupById = async (data) => {
  const group = await prisma.group.update({
    where: {
      id: data.id,
    },
    data: {
      name: data.name,
      description: data.description,
    },
  });

  return group;
};

export default updateGroupById;
