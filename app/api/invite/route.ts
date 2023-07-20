import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]";

export async function POST(request: Request) {
  const { refferal } = await request.json();
  console.log(refferal);
  const session = await getServerSession(authOptions);
  const currentUser = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
  });

  console.log("current", currentUser);

  // get the user from the database with an id that ends with the ref
  const inviter = await prisma.user.findFirst({
    where: {
      id: {
        endsWith: refferal,
      },
    },
  });

  console.log("inviter", inviter);

  try {
    const friendship = await prisma.friendship.create({
      data: {
        user: {
          connect: {
            id: currentUser?.id,
          },
        },
        friend: {
          connect: {
            id: inviter?.id,
          },
        },
      },
    });

    return NextResponse.json({ friendship });
  } catch (e) {
    console.error("oh no", e);
    return NextResponse.json({ error: "Duplicate" }, { status: 500 });
  }
  // return NextResponse.json({ error: "Duplicate" }, { status: 500 });
}
