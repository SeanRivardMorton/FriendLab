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

export async function PUT(response: NextRequest, { params }) {
  const { pollId } = params;
  const body = await response.json();

  const res = await prisma.poll.update({
    where: {
      id: pollId,
    },
    data: {
      question: body.question,
      options: {
        upsert: body.options.map((option) => ({
          where: {
            id: option.id,
          },
          update: {
            text: option.text,
          },
          create: {
            text: option.text,
          },
        })),
      },
    },
  });

  return NextResponse.json({ res });
}
