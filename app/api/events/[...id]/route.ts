import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { getEventsById } from "../getEventsById";
import { UpdateEvent } from "../updateEvent";

export async function PUT(request: Request) {
  const body = await request.json();
  try {
    const res = await UpdateEvent(body);

    return NextResponse.json({ res });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Duplicate" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  // get the id from the request
  const id = request.url.split("events/")[1];
  const events = await getEventsById([id]);
  return NextResponse.json({ ...events });
}
