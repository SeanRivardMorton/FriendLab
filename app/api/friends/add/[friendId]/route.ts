import { NextResponse } from "next/server";

import { getSession } from "../../../getSession";
import addFriend from "./addFriend";

export async function POST(req, { params }) {
  const session = await getSession();
  if (!session?.user?.id) return NextResponse.error();
  const { friendId } = await params;

  const response = await addFriend(session.user.id, friendId);

  return NextResponse.json(response);
}
