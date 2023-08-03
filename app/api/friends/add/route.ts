import { NextRequest, NextResponse } from "next/server";

import prisma from "../../../../lib/prisma";
import { getSession } from "../../getSession";
import addFriend from "./[friendId]/addFriend";

export async function POST(req: NextRequest, { params }) {
  const session = await getSession();
  const { friendId } = await req.json();
  if (!session?.user?.id) return NextResponse.json({ error: "Not logged in" });

  const findFriendWithLast5DigitsOfId = await prisma.user.findFirst({
    where: {
      id: {
        endsWith: friendId,
      },
    },
  });

  if (!findFriendWithLast5DigitsOfId)
    return NextResponse.json({ error: "Friend not found" });

  try {
    const addFriends = await addFriend(
      session.user.id,
      findFriendWithLast5DigitsOfId.id,
    );
    return NextResponse.json(addFriends);
  } catch (e) {
    return NextResponse.json({ error: "Friendship already exists" });
  }
}
