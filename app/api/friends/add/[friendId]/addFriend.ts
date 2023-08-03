import prisma from "../../../../../lib/prisma";

const addFriend = async (currentUserId: string, friendId: string) => {
  console.log(currentUserId, friendId);
  const data = prisma.friendship.create({
    data: {
      userId: currentUserId,
      friendId: friendId,
    },
  });
  const data2 = prisma.friendship.create({
    data: {
      userId: friendId,
      friendId: currentUserId,
    },
  });

  const friendship = await Promise.all([data, data2]);

  return friendship;
};

export default addFriend;
