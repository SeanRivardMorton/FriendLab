import { NextRequest, NextResponse } from "next/server";
import addGroupMember from "../../addGroupMember";
import removeGroupMember from "../../removeGroupMember";

export async function POST(req: NextRequest, { params }) {
  const { memberId } = await req.json();
  const { id } = params;

  const response = await addGroupMember(id, memberId);
  return await NextResponse.json(response);
}

export async function DELETE(req: NextRequest, { params }) {
  const { memberId } = await req.json();
  const { id } = params;

  const response = await removeGroupMember(id, memberId);
  return await NextResponse.json(response);
}
