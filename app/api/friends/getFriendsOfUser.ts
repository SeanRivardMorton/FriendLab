import prisma from "../../../lib/prisma";
import { getSession } from "../getSession";

const getFriendsOfUser = async () => {
  const session = await getSession();
  const friends = await prisma.friendship.findMany({
    where: {
      userId: session?.user?.id,
    },
    include: {
      friend: true,
    },
  });

  return friends
    .map((friend) => friend.friend)
    .filter((friend) => friend.id !== session?.user?.id);
};

export default getFriendsOfUser;
