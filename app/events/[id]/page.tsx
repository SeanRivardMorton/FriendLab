import {
  AvatarIcon,
  ChatBubbleIcon,
  CheckIcon,
  Cross1Icon,
} from "@radix-ui/react-icons";
import { formatDistance } from "date-fns";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import getEventById from "../../api/events/getEventById";
import { getSession } from "../../api/getSession";
import BottomTray from "../../components/BottomTray";
import ButtonTray from "../../components/ButtonTray";
import {
  CircleButtonInset,
  CircleButtonLinkInset,
} from "../../components/Form/button";

import { LOGIN_ROUTE } from "../../constants";
import ClientEventPage from "./client";
import getUserEventResponse from "../../api/events/[id]/users/[userId]/getUserEventResponse";
import { ResponseStatus } from "@prisma/client";

const responseMap = {
  [ResponseStatus.ACCEPTED]: <CheckIcon className="h-8 w-8 text-success" />,
  [ResponseStatus.DECLINED]: <Cross1Icon className="h-8 w-8 text-error" />,
};

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

  // if (!eventResponse) return <div>Something went wrong</div>;

  console.log(eventResponse);

  return (
    <main>
      <ButtonTray
        href="/"
        actionSlot={
          <CircleButtonInset className="h-8 w-8">
            {eventResponse && responseMap[eventResponse.response]}
          </CircleButtonInset>
        }
      >
        <div className="flex flex-row">
          {event?.creator.image ? (
            <Image
              className="rounded-full h-12 w-12 mr-2 my-auto"
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
      {
        <ClientEventPage
          userId={session?.user.id}
          event={event}
          response={eventResponse}
        />
      }
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
