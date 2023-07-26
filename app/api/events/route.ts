import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { getSession } from "../getSession";
import createNewEvent from "./createNewEvent";

export async function PUT(req: NextRequest | Request, res: NextResponse) {
  //   const { id } = req.params;
  const data = req.json();
  console.log(data);

  //   const event = await prisma.event.findUnique({
  //     where: {
  //       id,
  //     },
  //     include: {
  //       attendees: true,
  //     },
  //   });
  return NextResponse.json({});
}

export async function POST(req: NextRequest | Request, res: NextResponse) {
  const event = await req.json();
  const response = await createNewEvent(event);
  return NextResponse.json(response);
}
