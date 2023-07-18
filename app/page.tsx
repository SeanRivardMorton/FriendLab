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
  PlayIcon,
  ReaderIcon,
} from "@radix-ui/react-icons";

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
            <button className="btn btn-secondary mt-4 mx-auto">
              <CalendarIcon />
              Set availability
            </button>
            <button className="btn btn-primary mt-4 mx-auto">
              <LightningBoltIcon />
              New Event
              <LightningBoltIcon />
            </button>
          </div>
          <div className="card w-11/12 mx-auto mt-4 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Friend Invite Link</h2>
              <p className="border-2 rounded border-spacing-2 p-1">{link}</p>
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
              <button className="btn btn-sm btn-outline btn-primary">
                <ReaderIcon></ReaderIcon>
                Read More
              </button>
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
              <button className="btn btn-sm btn-outline btn-primary">
                <MagnifyingGlassIcon></MagnifyingGlassIcon>
                Take a look
              </button>
            </div>
          </div>
        </div>
        <div className="card w-11/12 mx-auto my-4 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Who's around</h2>
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
                    {friend.friend.name}
                  </li>
                ))}
            </ul>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">
                <PlayIcon />
                Invite Friends
              </button>
            </div>
          </div>
        </div>
      </ClientProtectedPage>
    </main>
  );
}
