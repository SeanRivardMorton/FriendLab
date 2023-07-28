import { NextResponse } from "next/server";
import deletePost from "./deletePost";
import getPost from "./getPost";

export async function GET(req, params) {
  const { id } = await params;
  const response = await getPost(id);
  return NextResponse.json(response);
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  console.log(id);
  const response = await deletePost(id);
  return NextResponse.json({ response });
}
