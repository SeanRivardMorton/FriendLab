import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest | Request) {
  return await NextResponse.json({});
}
