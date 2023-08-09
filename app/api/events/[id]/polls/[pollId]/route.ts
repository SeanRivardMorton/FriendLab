import { NextRequest, NextResponse } from "next/server";

import prisma from "../../../../../../lib/prisma";

export async function DELETE(request: NextRequest, { params }) {
  const { pollId } = params;

  const res = await prisma.$transaction([
    prisma.pollOption.deleteMany({
      where: {
        pollId: pollId,
      },
    }),
    prisma.poll.delete({
      where: {
        id: pollId,
      },
    }),
  ]);

  return NextResponse.json({ res });
}

export async function GET(res: NextRequest, { params }) {
  const { pollId } = params;

  const event = await prisma.poll.findUnique({
    where: {
      id: pollId,
    },
    include: {
      options: true,
    },
  });

  return NextResponse.json(event);
}
