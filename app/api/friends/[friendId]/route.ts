import { NextRequest, NextResponse } from "next/server";

import prisma from "../../../../lib/prisma";
import { getSession } from "../../getSession";

export async function DELETE(req: NextRequest, { params }) {
  const { friendId } = params;
  const session = await getSession();
  if (!session?.user?.id) return NextResponse.json({ error: "Not logged in" });

  const deletedFriend = await prisma.friendship.deleteMany({
    where: {
      OR: [
        {
          userId: session.user.id,
          friendId: friendId,
        },
        {
          userId: friendId,
          friendId: session.user.id,
        },
      ],
    },
  });

  return await NextResponse.json(deletedFriend);
}
