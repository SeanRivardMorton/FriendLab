import { NextResponse } from "next/server";

import deleteGroupById from "../deleteGroupById";
import updateGroupById from "../updateGroupById";

export async function PUT(req, res) {
  const data = await req.json();
  const updatedGroup = await updateGroupById(data);
  return NextResponse.json({ updatedGroup });
}

export async function DELETE(req, res) {
  const data = await req.url;
  const id = data.split("groups/")[1];
  const deletedGroup = await deleteGroupById(id);
  return NextResponse.json({ deletedGroup });
}
