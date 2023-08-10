import { NextRequest, NextResponse } from "next/server";

import prisma from "../../../../../../lib/prisma";
import { getSession } from "../../../../../api/getSession";

export async function PUT(request: NextRequest, { params }) {
  const session = await getSession();
  const { optionId } = await request.json();
  const { pollId } = params;

  if (!session?.user)
    return NextResponse.json({
      status: 401,
      body: { message: "Unauthorized" },
    });

  //   console.log(option);

  const res = await prisma.pollVote.create({
    data: {
      userId: session?.user.id,
      optionId: optionId,
    },
  });

  return NextResponse.json({ status: 200, body: res });
}

export async function GET(request: NextRequest, { params }) {
  const { pollId } = params;

  const results = await prisma.pollOption.findMany({
    where: {
      pollId: pollId,
    },
    include: {
      _count: {
        select: {
          pollVote: true,
        },
      },
    },
  });

  return NextResponse.json({ status: 200, body: results });
}
