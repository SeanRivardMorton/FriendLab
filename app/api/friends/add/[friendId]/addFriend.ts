import prisma from "../../../../../lib/prisma";

const addFriend = async (currentUserId: string, friendId: string) => {
  const friendship = await prisma.friendship.create({
    data: {
      user: {
        connect: {
          id: currentUserId,
        },
      },
      friend: {
        connect: {
          id: friendId,
        },
      },
    },
  });

  // Prisma throws an invocation error if we try to create the second friendship record
  // if one already exists. So we need to check if the friendship already exists before
  // creating it.

  //   const data = prisma.friendship.create({
  //     data: {
  //       userId: currentUserId,
  //       friendId: friendId,
  //     },
  //   });

  //   // Create the second friendship record
  //   const data2 = prisma.friendship.create({
  //     data: {
  //       userId: friendId,
  //       friendId: currentUserId,
  //     },
  //   });

  //   const friendship = await Promise.all([data, data2]);

  return friendship;
};

export default addFriend;
