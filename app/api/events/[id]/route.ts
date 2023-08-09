import { NextRequest, NextResponse } from "next/server";

import prisma from "../../../../lib/prisma";
import { getSession } from "../../getSession";
import { Event } from "../getEventById";
import updateEventPoll from "./updatePoll";

export async function PUT(request: Request, { params }) {
  const data: Event = await request.json();

  const res = await updateEventPoll(params.id, data);
  // const res = await prisma.event.update({
  //   where: {
  //     id: params.id,
  //   },
  //   data: {
  //     name: data.name,
  //     description: data.description,
  //     location: data.location,
  //     date: data.date,
  //     poll: {
  //       update: {
  //         options: {
  //           update: data.poll.options,
  //         },
  //       },
  //     }
  //   },
  // });
  return NextResponse.json({ res });
}

export async function POST(request: NextRequest, { params }) {
  const body = await request.json();
  const id = params.id;
  const res = updateEventPoll(id, body);
  return NextResponse.json(res);
}

export async function DELETE(request: NextRequest, { params }) {
  const { id } = params;

  await prisma.eventResponse.deleteMany({
    where: {
      eventId: id,
    },
  });

  const res = await prisma.event.delete({
    where: {
      id,
    },
  });
  return NextResponse.json({ res });
}

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
    },
  });

  return NextResponse.json({ event });
}
