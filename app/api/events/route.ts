import { NextRequest, NextResponse } from "next/server";

import prisma from "../../../lib/prisma";
import { getSession } from "../getSession";
import createNewEvent from "./createNewEvent";

export async function PUT(req: NextRequest | Request, res: NextResponse) {
  return NextResponse.json({});
}

export async function POST(req: NextRequest | Request, res: NextResponse) {
  const event = await req.json();
  const response = await createNewEvent(event);
  return NextResponse.json(response);
}

export async function GET(request: NextRequest, { params }) {
  const session = await getSession();
  if (!session?.user) return NextResponse.json({ error: "Not logged in" });

  const res = await prisma.event.findMany({
    where: {
      attendees: {
        some: {
          id: session.user.id,
        },
      },
    },
    include: {
      creator: true,
      eventResponse: {
        where: {
          userId: session.user.id,
        },
        include: {
          user: true,
        },
      },
    },
  });
  console.log(res);
  return NextResponse.json(res);
}
