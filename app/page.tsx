import React from "react";
import { getServerSession } from "next-auth/next";
import ClientProtectedPage from "./protected/client/page";
import CopyLink from "./components/CopyLink";
import { authOptions } from "./api/auth/[...nextauth]";
import prisma from "../lib/prisma";
import Image from "next/image";
import {
  CalendarIcon,
  LightningBoltIcon,
  MagnifyingGlassIcon,
  PersonIcon,
  PlayIcon,
  ReaderIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
  });

  const friends =
    user &&
    (await prisma.friendship.findMany({
      where: {
        userId: user.id,
      },
      include: {
        friend: true,
      },
    }));

  console.log("friends", friends);

  const baseUrl =
    process.env.NEXTAUTH_URL || "https://friendlab.co.uk/api/auth/signin";

  // ghetto way to get url
  const url = baseUrl.replace("api/auth/signin", "invite");

  const link = user ? `${url}?ref=${user.id.slice(-6)}` : url;

  return (
    <main>
      <ClientProtectedPage>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <Link href="/calendar" className="btn btn-secondary mt-4 mx-auto">
              <CalendarIcon />
              Set availability
            </Link>
            <Link href="/events/new" className="btn btn-primary mt-4 mx-auto">
              <LightningBoltIcon />
              New Event
              <LightningBoltIcon />
            </Link>
          </div>
          <div className="card w-11/12 mx-auto mt-4 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Friend Invite Link</h2>
              <p className="border-2 rounded border-spacing-2 p-1 border-primary">
                {link}
              </p>
              <CopyLink link={link}></CopyLink>
            </div>
          </div>
        </div>
        <div className="card w-11/12 mx-auto my-4 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Friend Lab News</h2>
            <p>
              <strong>Version 0.1.0</strong> Launch 🎉🎉🎉
            </p>
            <div className="card-actions justify-end">
              <Link className="btn btn-link" href="/news">
                <ReaderIcon></ReaderIcon>
                Read More
              </Link>
            </div>
          </div>
        </div>
        <div className="card w-11/12 mx-auto my-4 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Upcoming Events</h2>
            <ul>
              <li>Pub</li>
              <li>Movie</li>
              <li>Walk</li>
            </ul>
            <div className="card-actions justify-end">
              <Link href="/events" className="btn btn-link btn-primary">
                <MagnifyingGlassIcon></MagnifyingGlassIcon>
                Take a look
              </Link>
            </div>
          </div>
        </div>
        <div className="card w-11/12 mx-auto my-4 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Who&apos;s around</h2>
            <ul>
              {friends &&
                friends.map((friend) => (
                  <li className="flex flex-row my-2" key={friend.id}>
                    {friend.friend.image && (
                      <Image
                        src={friend.friend.image}
                        height={24}
                        width={24}
                        alt="friend icon"
                        className="rounded-xl mr-2"
                      />
                    )}
                    <Link href={`/friends/${friend.friend.id}`}>
                      {friend.friend.name}
                    </Link>
                  </li>
                ))}
            </ul>
            <div className="card-actions justify-end flex flex-row">
              <Link href="/friends" className="btn btn-link">
                <PersonIcon />
                View
              </Link>
              <Link href="/friends/invite" className="btn text-white">
                <PlayIcon />
                Invite Friends
              </Link>
            </div>
          </div>
        </div>
      </ClientProtectedPage>
    </main>
  );
}
