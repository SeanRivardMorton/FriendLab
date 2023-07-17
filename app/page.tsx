import React from "react";
import { getServerSession } from "next-auth/next";
import ClientProtectedPage from "./protected/client/page";
import CopyLink from "./components/CopyLink";
import { authOptions } from "./api/auth/[...nextauth]";
import prisma from "../lib/prisma";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
  });

  const baseUrl =
    process.env.NEXTAUTH_URL || "https://friendlab.co.uk/api/auth/signin";

  // ghetto way to get url
  const url = baseUrl.replace("api/auth/signin", "invite");

  const link = user ? `${url}?=${user.id.slice(-6)}` : url;

  return (
    <main>
      <ClientProtectedPage>
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
