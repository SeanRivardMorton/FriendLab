import { NextResponse } from "next/server";

import createGroup from "./createGroup";

export async function POST(req, res) {
  const data = await req.json();
  const response = await createGroup(data);
  return NextResponse.json(response);
}
