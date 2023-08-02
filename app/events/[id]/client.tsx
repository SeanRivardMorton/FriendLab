"use client";

import { ResponseStatus } from "@prisma/client";
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
import { useImmer } from "use-immer";

import BottomTray from "../../components/BottomTray";
import ButtonTray from "../../components/ButtonTray";
import { CircleButtonInset } from "../../components/Form/button";
import {
  AcceptInviteButton,
  DeclineInviteButton,
} from "../../components/FunctionalButtons/UserEventResponseButtons";
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

const ClientEventPage: React.FC<ClientEventPageProps> = ({ userId, event }) => {
  const [iEvent, setIEvent] = useImmer(event);

  return (
    <>
      <ButtonTray href="/events">
        <h2>Hangout</h2>
      </ButtonTray>
      <div className="card card-compact mt-8 bg-base-200">
        <div className="card-body">
          <div className="flex flex-row">
            {iEvent?.creator?.image ? (
              <Image
                alt="Profile Picture"
                className="mr-2 h-14 w-14 rounded-full"
                src={iEvent?.creator?.image}
                width={56}
                height={56}
              />
            ) : (
              <AvatarIcon className="mr-2 h-14 w-14" />
            )}
            <div className="flex flex-col">
              <div className="card-title">{iEvent?.name}</div>
              <span>{iEvent.date ? iEvent.date.toDateString() : ""}</span>
            </div>
            <Pencil1Icon className="ml-auto h-8 w-8" />
          </div>
          <div className="divider my-1">What&apos;s going on</div>
          <div className="prose">
            <p>{iEvent.description}</p>
            <div className="flex flex-row">
              <SewingPinIcon className="my-auto h-6 w-6" />
              <h3 className="my-auto">Location: {iEvent.location}</h3>
            </div>
          </div>
          <div className="divider">
            <div className="divider-text">Who&apos;s going</div>
          </div>
          <div className="flex flex-col">
            {iEvent.attendees?.map((attendee) => (
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

        <DeclineInviteButton
          userId={userId}
          eventId={event.id}
          onSuccess={(e) =>
            // This makes me sad
            setIEvent((draft) => {
              if (!draft?.attendees) return;
              const attendee = draft?.attendees.find(
                (attendee) => attendee.id === e.userId,
              );

              if (!attendee?.eventResponse) return;

              attendee.eventResponse[0].response = ResponseStatus.DECLINED;
            })
          }
        />
        <AcceptInviteButton
          onSuccess={(e) =>
            setIEvent((draft) => {
              if (!draft?.attendees) return;
              const attendee = draft?.attendees.find(
                (attendee) => attendee.id === e.userId,
              );

              if (!attendee?.eventResponse) return;

              attendee.eventResponse[0].response = ResponseStatus.ACCEPTED;
            })
          }
          userId={userId}
          eventId={event.id}
        />
      </BottomTray>
    </>
  );
};

export default ClientEventPage;
