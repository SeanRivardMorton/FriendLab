import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]";

export async function POST(request: Request) {
  const { name, members } = await request.json();
  const session = await getServerSession(authOptions);
  console.log(members);
  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
  });

  try {
    if (!user) return NextResponse.json({ error: "No user" }, { status: 500 });
    const group = await prisma.group.create({
      data: {
        name: name,
        creatorId: user?.id,
        members: {
          connect: members.map((member) => {
            return {
              id: member.id,
            };
          }),
        },
      },
    });

    return NextResponse.json({ group });
  } catch (e) {
    console.error("oh no", e);
    return NextResponse.json({ error: "Duplicate" }, { status: 500 });
  }
}
