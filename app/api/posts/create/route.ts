import { NextRequest, NextResponse } from "next/server";
import createPost from "../../../news/createPost";

export async function POST(req: NextRequest, params) {
  const post = await req.json();
  const response = await createPost(post);
  return NextResponse.json(response);
}
