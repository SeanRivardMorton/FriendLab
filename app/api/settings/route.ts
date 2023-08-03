import { NextRequest, NextResponse } from "next/server";

import prisma from "../../../lib/prisma";
import { AsyncReturnType } from "../../utils/AsyncReturnType";
import { getSession } from "../getSession";
import { getUser } from "./getUser";

export type UserSettings = AsyncReturnType<typeof getUser>;

export async function GET(req: NextRequest, { params }) {
  const session = await getSession();
  if (!session?.user) return NextResponse.redirect("/login");
  const user = await getUser(session?.user?.id);

  return NextResponse.json(user);
}

export async function PUT(req: NextRequest, { params }) {
  const data = await req.json();
  const session = await getSession();

  if (!session?.user) return NextResponse.redirect("/login");

  const user = await prisma.user.update({
    where: {
      id: session?.user?.id,
    },
    data: {
      ...data,
    },
  });

  return NextResponse.json(user);
}
