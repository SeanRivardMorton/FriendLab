import { AvatarIcon, ChatBubbleIcon } from "@radix-ui/react-icons";
import { formatDistance } from "date-fns";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import getEventById from "../../api/events/getEventById";
import { getSession } from "../../api/getSession";
import BottomTray from "../../components/BottomTray";
import ButtonTray from "../../components/ButtonTray";
import { CircleButtonLinkInset } from "../../components/Form/button";

import { LOGIN_ROUTE } from "../../constants";
import ClientEventPage from "./client";
import getUserEventResponse from "../../api/events/[id]/users/[userId]/getUserEventResponse";

const Home = async ({ params }) => {
  const session = await getSession();

  if (!session?.user?.id) {
    return redirect(LOGIN_ROUTE);
  }
  const eventResponse = await getUserEventResponse(
    session?.user?.id,
    params.id
  );

  const event = await getEventById(params.id);

  if (!event) return <>not sure how you got here..</>;

  const date = formatDistance(new Date(event?.date ?? null), new Date(), {
    addSuffix: true,
  });

  return (
    <main>
      <ButtonTray href="/">
        <div className="flex flex-row">
          {event?.creator.image ? (
            <Image
              className="rounded-full mr-2"
              src={event.creator.image}
              height={44}
              width={44}
              alt={event?.creator?.name ?? "user image"}
            />
          ) : (
            <div className="h-12 w-12 rounded-full bg-primary">
              <AvatarIcon />
            </div>
          )}
          <div className="flex flex-col">
            <h2>{event.name}</h2>
            <p className="text-sm text-primary">{date}</p>
          </div>
        </div>
      </ButtonTray>
      <ClientEventPage
        userId={session?.user.id}
        event={event}
        response={eventResponse}
      />
      <BottomTray>
        <CircleButtonLinkInset>
          <ChatBubbleIcon className="h-8 w-8" />
        </CircleButtonLinkInset>
      </BottomTray>
      {/* <FriendLabHeader event={event} />
      <FriendLabPoll />
      <FriendLabThreads /> */}
    </main>
  );
};

export default Home;
