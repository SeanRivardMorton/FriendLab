import prisma from "../../../lib/prisma";

const getGroupById = async (id: string) => {
  if (!id) return [];
  const group = await prisma.group.findUnique({
    where: {
      id,
    },
    include: {
      members: true,
    },
  });

  return group;
};

export default getGroupById;
