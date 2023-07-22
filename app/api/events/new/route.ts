import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { authOptions } from "../../auth/[...nextauth]";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-GvySuHVj79iGAp6MWzxQtvfq",
  apiKey: process.env.OPENAI_API_KEY,
});

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

  const now = new Date();

  const openai = new OpenAIApi(configuration);
  const chatCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `Respond only with a ISO 8601 timecode. right now is ${now.toISOString()}. Give me the date for next ${date}`,
      },
    ],
  });

  const parsedDate = chatCompletion.data.choices[0].message?.content || "";
  console.log(parsedDate);

  const patternMatchDate = parsedDate?.match(
    /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/
  );

  if (!patternMatchDate) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }

  if (!name || !description || !date || !location) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const event = await prisma.event.create({
      data: {
        name,
        description,
        date: new Date(parsedDate),
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
