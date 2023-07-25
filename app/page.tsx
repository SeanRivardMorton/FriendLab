import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";

import { redirect } from "next/navigation";
import { LOGIN_ROUTE } from "./constants";
import FriendLabPoll from "./components/FriendLabPoll";
import FriendLabHeader from "./components/FriendLabHeader";
import FriendLabThreads from "./components/FriendLabThreads";

export default async function Home() {
  return (
    <main>
      <FriendLabHeader />
      <FriendLabPoll />
      <FriendLabThreads />
    </main>
  );
}
