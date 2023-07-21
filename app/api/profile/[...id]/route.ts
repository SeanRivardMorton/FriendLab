import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { authOptions } from "../../auth/[...nextauth]";

export async function GET(request: Request) {
  const req = request.url;
  const id = req.split("profile/")[1];

  const profile = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  console.log(profile);

  return NextResponse.json({ ...profile });
}
