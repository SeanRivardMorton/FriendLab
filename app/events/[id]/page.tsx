import {
  AvatarIcon,
  ChatBubbleIcon,
  CheckIcon,
  CircleIcon,
  Cross1Icon,
  Pencil1Icon,
  SewingPinIcon,
  TrashIcon,
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
// import getUserEventResponse from "../../api/events/[id]/users/[userId]/getUserEventResponse";
import { ResponseStatus } from "@prisma/client";
import DeleteButton from "../../components/DeleteButton.tsx";
import prisma from "../../../lib/prisma";
import {
  AcceptInviteButton,
  DeclineInviteButton,
} from "../../components/FunctionalButtons/UserEventResponseButtons";

const responseMap = {
  [ResponseStatus.ACCEPTED]: <CheckIcon className="h-8 w-8 text-success" />,
  [ResponseStatus.DECLINED]: <Cross1Icon className="h-8 w-8 text-error" />,
  [ResponseStatus.MAYBE]: <ChatBubbleIcon className="h-8 w-8 text-warning" />,
  [ResponseStatus.PENDING]: <CircleIcon className="h-8 w-8" />,
};

const getEvent = async (id) => {
  const event = await prisma.event.findUnique({
    where: {
      id: id,
    },
    include: {
      attendees: {
        include: {
          eventResponse: true,
        },
      },
      creator: true,
      group: true,
      eventResponse: {
        include: {
          user: true,
        },
      },
    },
  });
  const filterAttendeesEventResponse = event?.attendees.map((attendee) => {
    const eventResponse = attendee.eventResponse.filter(
      (response) => response.eventId === event?.id
    );
    return {
      ...attendee,
      eventResponse: eventResponse,
    };
  });

  return { ...event, attendees: filterAttendeesEventResponse };
};

const Home = async ({ params }) => {
  const session = await getSession();

  if (!session?.user?.id) {
    return redirect(LOGIN_ROUTE);
  }

  const event = await getEvent(params.id);
  if (!event) return <>Could not find</>;
  return (
    <main>
      <ButtonTray href="/events">
        <h2>Hangout</h2>
      </ButtonTray>
      <div className="card card-compact bg-base-200 mt-8">
        <div className="card-body">
          <div className="flex flex-row">
            {event?.creator?.image ? (
              <Image
                alt="Profile Picture"
                className="rounded-full h-14 w-14 mr-2"
                src={event?.creator?.image}
                width={56}
                height={56}
              />
            ) : (
              <AvatarIcon className="w-14 h-14 mr-2" />
            )}
            <div className="flex flex-col">
              <div className="card-title">{event?.name}</div>
              <span>{event.date ? event.date.toDateString() : ""}</span>
            </div>
            <Pencil1Icon className="w-8 h-8 ml-auto" />
          </div>
          <div className="divider my-1">What&apos;s going on</div>
          <div className="prose">
            <p>{event.description}</p>
            <div className="flex flex-row">
              <SewingPinIcon className="my-auto h-6 w-6" />
              <h3 className="my-auto">Location: {event.location}</h3>
            </div>
          </div>
          <div className="divider">
            <div className="divider-text">Who&apos;s going</div>
          </div>
          <div className="flex flex-col">
            {event.attendees?.map((attendee) => (
              <div key={attendee.id} className="flex flex-row my-1">
                {attendee?.image ? (
                  <Image
                    alt="Profile Picture"
                    className="rounded-full h-10 w-10 mr-2"
                    src={attendee?.image}
                    width={56}
                    height={56}
                  />
                ) : (
                  <AvatarIcon className="w-10 h-10 mr-2" />
                )}
                <div className="flex flex-col my-auto">
                  <div className="card-title">{attendee.name}</div>
                </div>
                <div className="ml-auto">
                  {responseMap[attendee.eventResponse[0]?.response]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomTray>
        <div className="my-auto">Make Suggestion</div>
        <CircleButtonInset>
          <ChatBubbleIcon className="h-8 w-8 text-warning" />
        </CircleButtonInset>
      </BottomTray>
      <BottomTray>
        <div className="my-auto">Still Going?</div>
        <CircleButtonInset>
          <DeclineInviteButton userId={session.user.id} eventId={event.id} />
        </CircleButtonInset>
        <CircleButtonInset>
          <AcceptInviteButton userId={session.user.id} eventId={event.id} />
        </CircleButtonInset>
      </BottomTray>
    </main>
  );
};

export default Home;
