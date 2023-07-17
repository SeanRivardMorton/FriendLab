import React from "react";
import { getServerSession } from "next-auth/next";
import ClientProtectedPage from "./protected/client/page";
import CopyLink from "./components/CopyLink";
import { authOptions } from "./api/auth/[...nextauth]";
import prisma from "../lib/prisma";
import Image from "next/image";

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
        <div className="flex flex-col lg:w-1/3">
          {friends && (
            <>
              <h2>Your Friends</h2>
              {friends.map((friend) => {
                return (
                  <div key={friend.id} className="flex flex-row m-2">
                    <div className="avatar">
                      <div className="w-8 rounded-xl mr-2">
                        {friend.friend.image && (
                          <Image
                            height={16}
                            width={16}
                            src={friend.friend.image}
                            alt="user avatar"
                          />
                        )}
                      </div>
                    </div>
                    <div>{friend.friend.email}</div>
                  </div>
                );
              })}
            </>
          )}
        </div>

        <div className="hero text-center min-h-[92vh]">
          <div className="hero-content flex flex-col w-11/12 lg:w-1/3">
            <h1 className="text-2xl my-2">
              Invite your friends to get started
            </h1>
            <div className="flex flex-col w-full">
              <label className="label">
                <span className="label-text">Invite Link</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered input-primary w-full"
                value={link}
                disabled
              />

              <CopyLink link={link} />
            </div>
          </div>
        </div>
      </ClientProtectedPage>
    </main>
  );
}
