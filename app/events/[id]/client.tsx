"use client";

import { EventResponse, Prisma, ResponseStatus } from "@prisma/client";
import {
  AvatarIcon,
  ChatBubbleIcon,
  CheckIcon,
  CircleIcon,
  Cross1Icon,
  Pencil1Icon,
  SewingPinIcon,
} from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

import BottomTray from "../../components/BottomTray";
// import { Event } from "../../api/events/getEventById";
import ButtonTray from "../../components/ButtonTray";
import { CircleButtonInset } from "../../components/Form/button";
import {
  AcceptInviteButton,
  DeclineInviteButton,
} from "../../components/FunctionalButtons/UserEventResponseButtons";
import GroupUserAvatarsRow, {
  EventUserAvatarsRow,
} from "../../groups/GroupUserAvatarRow";
import { EventType } from "./page";
interface ClientEventPageProps {
  userId: string;
  event: EventType;
}

const responseIconMap = {
  [ResponseStatus.ACCEPTED]: <CheckIcon className="h-8 w-8 text-success" />,
  [ResponseStatus.DECLINED]: <Cross1Icon className="h-8 w-8 text-error" />,
  [ResponseStatus.MAYBE]: <ChatBubbleIcon className="h-8 w-8 text-warning" />,
  [ResponseStatus.PENDING]: <CircleIcon className="h-8 w-8" />,
};

const updateUserResponse = async (userId, eventId, response) => {
  const res = await fetch(`/api/events/${eventId}/users/${userId}`, {
    method: "PUT",
    body: JSON.stringify({ response }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
  return data;
};

const ClientEventPage: React.FC<ClientEventPageProps> = ({ userId, event }) => {
  const date = event?.date && new Date(event.date).toDateString();
  const userResponseQuery = useMutation({
    mutationFn: (response: ResponseStatus) =>
      updateUserResponse(userId, event.id, response),
  });
  return (
    <>
      <ButtonTray href="/events">
        <h2>Hangout</h2>
      </ButtonTray>
      <div className="card-compact card mt-8 bg-base-200">
        <div className="card-body">
          <div className="flex flex-row">
            {event?.creator?.image ? (
              <Image
                alt="Profile Picture"
                className="mr-2 h-14 w-14 rounded-full"
                src={event?.creator?.image}
                width={56}
                height={56}
              />
            ) : (
              <AvatarIcon className="mr-2 h-14 w-14" />
            )}
            <div className="flex flex-col">
              <div className="card-title">{event?.name}</div>
              <span>{event.date ? event.date.toDateString() : ""}</span>
            </div>
            <Pencil1Icon className="ml-auto h-8 w-8" />
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
              <div key={attendee.id} className="my-1 flex flex-row">
                {attendee?.image ? (
                  <Image
                    alt="Profile Picture"
                    className="mr-2 h-10 w-10 rounded-full"
                    src={attendee?.image}
                    width={56}
                    height={56}
                  />
                ) : (
                  <AvatarIcon className="mr-2 h-10 w-10" />
                )}
                <div className="my-auto flex flex-col">
                  <div className="card-title">{attendee.name}</div>
                </div>
                <div className="ml-auto">
                  {responseIconMap[attendee.eventResponse[0]?.response]}
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
          <DeclineInviteButton userId={userId} eventId={event.id} />
        </CircleButtonInset>
        <CircleButtonInset>
          <AcceptInviteButton userId={userId} eventId={event.id} />
        </CircleButtonInset>
      </BottomTray>
    </>
  );
};

export default ClientEventPage;
