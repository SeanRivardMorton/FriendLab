import React from "react";
import { getServerSession } from "next-auth/next";
import { Client } from "@vercel/postgres";
import ClientProtectedPage from "./protected/client/page";
import { ClipboardCopyIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import CopyLink from "./components/CopyLink";
import { authOptions } from "./api/auth/[...nextauth]/route";
import crypto from "crypto";

const createHash = crypto.getHashes();

export default async function Home() {
  const session = await getServerSession(authOptions);

  // ghetto way to get url
  const url = process.env.NEXTAUTH_URL.replace("api/auth/signin", "invite");

  const hashed = session?.user?.email
    ? crypto
        .createHash("sha256")
        .update(session?.user?.email)
        .digest("hex")
        .slice(-6)
    : null;

  const link = hashed ? `${url}?=${hashed}` : url;

  return (
    <main>
      <ClientProtectedPage>
        <div className="hero text-center min-h-[92vh]">
          <div className="hero-content flex flex-col">
            <h1 className="text-2xl my-2">You don't have any friends. Sad.</h1>
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
