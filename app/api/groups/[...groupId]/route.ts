import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { headers } from "next/headers";
import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { friendId, groupId } = await request.json();

  const updatedGroup = await prisma.group.update({
    where: {
      id: groupId,
    },
    data: {
      members: {
        connect: {
          id: friendId,
        },
      },
    },
  });

  return NextResponse.json({ updatedGroup });
}
