import { redirect } from "next/navigation";
import React from "react";

import getEventById from "../../api/events/getEventById";
import getEventsByUserId from "../../api/events/getEventsByUserId";
import { getSession } from "../../api/getSession";
import FriendLabHeader from "../../components/FriendLabHeader";
import FriendLabPoll from "../../components/FriendLabPoll";
import FriendLabThreads from "../../components/FriendLabThreads";
import { LOGIN_ROUTE } from "../../constants";

const Home = async ({ params }) => {
  const session = await getSession();

  if (!session?.user) {
    return redirect(LOGIN_ROUTE);
  }

  const event = await getEventById(params.id);

  if (!event) return <>not sure how you got here..</>;

  return (
    <main>
      <FriendLabHeader event={event} />
      <FriendLabPoll />
      <FriendLabThreads />
    </main>
  );
};

export default Home;
