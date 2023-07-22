import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { authOptions } from "../../auth/[...nextauth]";

type NewEventFormValues = {
  name: string;
  description: string;
  location: string;
  date: string;
  time: string;
  attendees: string;
};

export async function POST(request: Request) {
  const {
    name,
    description,
    date,
    time,
    location,
    attendees,
  }: NewEventFormValues = await request.json();
  const session = await getServerSession(authOptions);

  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
  });

  console.log("user", user);
  console.log(name, description, date, location, attendees);

  if (!name || !description || !date || !location) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const event = await prisma.event.create({
      data: {
        name,
        description,
        date: new Date(),
        location,
        creator: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    return NextResponse.json({ event });
  } catch (e) {
    console.error("oh no", e);
    return NextResponse.json({ error: "Duplicate" }, { status: 500 });
  }

  //   return NextResponse.json({ updatedGroup });
}
