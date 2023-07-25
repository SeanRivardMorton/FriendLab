import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";

import { redirect } from "next/navigation";
import { LOGIN_ROUTE } from "./constants";
import FriendLabPoll from "./components/FriendLabPoll";
import FriendLabHeader from "./components/FriendLabHeader";
import FriendLabThreads from "./components/FriendLabThreads";
import { getSession } from "./api/getSession";

export default async function Home() {
  const session = await getSession();

  if (!session?.user?.id) {
    return redirect(LOGIN_ROUTE);
  }

  return (
    <main>
      <FriendLabHeader />
      <FriendLabPoll />
      <FriendLabThreads />
    </main>
  );
}
