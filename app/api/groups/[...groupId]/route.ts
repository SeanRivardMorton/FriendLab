import { NextResponse } from "next/server";
import { updateGroup } from "./updateGroup";
import { deleteGroup } from "./deleteGroup";

export async function PUT(request: Request) {
  const { friendId, groupId } = await request.json();

  const updatedGroup = await updateGroup({ groupId, friendId });

  return NextResponse.json({ updatedGroup });
}

export async function DELETE(request: Request) {
  const { groupId } = await request.json();

  const updatedGroup = deleteGroup({ groupId });

  return NextResponse.json({ updatedGroup });
}
