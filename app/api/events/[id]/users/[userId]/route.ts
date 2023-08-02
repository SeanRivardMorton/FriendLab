import { NextRequest, NextResponse } from "next/server";

import putUserEventResponse from "./putUserEventResponse";

export async function PUT(req: NextRequest, { params }) {
  const { id: eventId, userId } = await params;
  const { response } = await req.json();
  const res = await putUserEventResponse(userId, eventId, response);
  return await NextResponse.json(res);
}
