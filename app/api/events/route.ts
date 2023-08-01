import { NextRequest, NextResponse } from "next/server";
import createNewEvent from "./createNewEvent";

export async function PUT(req: NextRequest | Request, res: NextResponse) {
  return NextResponse.json({});
}

export async function POST(req: NextRequest | Request, res: NextResponse) {
  const event = await req.json();
  const response = await createNewEvent(event);
  return NextResponse.json(response);
}
