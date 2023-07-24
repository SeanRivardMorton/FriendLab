import { Prisma } from "@prisma/client";
import prisma from "../../../lib/prisma";

export const getUserFriends = async (userId: string) => {
  const friends = await prisma.friendship.findMany({
    where: {
      userId: userId,
    },
    include: {
      friend: true,
    },
  });
  return friends;
};

export type FrienshipWithFriends = Prisma.FriendshipGetPayload<{
  include: {
    friend: true;
  };
}>;
