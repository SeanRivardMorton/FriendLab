import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

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
  return event;
}
