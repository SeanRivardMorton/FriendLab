import { redirect } from "next/navigation";
import React from "react";
import { getSession } from "../../api/getSession";
import FriendLabHeader from "../../components/FriendLabHeader";
import FriendLabPoll from "../../components/FriendLabPoll";
import FriendLabThreads from "../../components/FriendLabThreads";
import { LOGIN_ROUTE } from "../../constants";

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
