import prisma from "../../../lib/prisma";

const getCurrentUserFriends = async (userId: string) => {
  const friends = await prisma.friendship.findMany({
    where: {
      OR: [
        {
          userId: userId,
        },
        {
          friendId: userId,
        },
      ],
    },
    include: {
      friend: true,
    },
  });
  return friends
    .map(({ friend }) => friend)
    .filter((friend) => friend.id !== userId);
};

export default getCurrentUserFriends;
