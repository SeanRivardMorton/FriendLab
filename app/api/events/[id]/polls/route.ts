import { NextRequest, NextResponse } from "next/server";

import prisma from "../../../../../lib/prisma";
import { NewPollPayload } from "../../../../events/[id]/polls/usePoll";

export async function GET(res: NextRequest, { params }) {
  const { id } = params;

  const event = await prisma.event.findUnique({
    where: {
      id,
    },
    include: {
      poll: {
        include: {
          options: true,
        },
      },
      eventResponse: true,
      attendees: true,
      group: true,
      creator: true,
    },
  });

  return NextResponse.json(event);
}

export async function POST(request: NextRequest, { params }) {
  const body: NewPollPayload = await request.json();
  const id = params.id;
  console.log(body, id);
  const res = await prisma.poll.create({
    data: {
      event: {
        connect: {
          id: id,
        },
      },
      question: body.question,
      options: {
        create: body.options,
      },
    },
  });

  return NextResponse.json({ status: 200, body: res });
}

export async function PUT(request: NextRequest, { params }) {
  //   const body: NewPollPayload  = await request.json();
  //   const id = params.id;
  //   const res = await prisma.event.update({
  //     where: {
  //       id: id,
  //     },
  //     data: {
  //       poll: {
  //         update: {
  //           options: {
  //             update: body.options,
  //           },
  //         },
  //       },
  //     },
  //   });
  //   return NextResponse.json({ res });
  return NextResponse.json({ res: "PUT" });
}
