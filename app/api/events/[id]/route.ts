import { NextRequest, NextResponse } from "next/server";

import prisma from "../../../../lib/prisma";
import { getSession } from "../../getSession";
import { Event } from "../getEventById";

export async function PUT(request: Request, { params }) {
  const data: Event = await request.json();

  const res = await prisma.event.update({
    where: {
      id: params.id,
    },
    data: {
      name: data.name,
      description: data.description,
      location: data.location,
      date: data.date,
    },
  });
  return NextResponse.json({ res });
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
