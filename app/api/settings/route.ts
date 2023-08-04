import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";

import prisma from "../../../lib/prisma";
import { AsyncReturnType } from "../../utils/AsyncReturnType";
import { getSession } from "../getSession";
import { getUser } from "./getUser";

export type UserSettings = AsyncReturnType<typeof getUser>;

export async function GET(req: NextRequest, { params }) {
  const session = await getSession();
  if (!session?.user) return NextResponse.redirect("/login");
  const cachedSettings = await kv.get(`settings:${session?.user?.id}`);
  if (cachedSettings) return NextResponse.json(cachedSettings);
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

  await kv.set(`settings:${session?.user?.id}`, user);
  return NextResponse.json(user);
}
