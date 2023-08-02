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
import { useForm } from "react-hook-form";
import { useImmer } from "use-immer";

import BottomTray from "../../components/BottomTray";
import ButtonTray from "../../components/ButtonTray";
import { CircleButtonInset } from "../../components/Form/button";
import {
  AcceptInviteButton,
  DeclineInviteButton,
  InviteButton,
} from "../../components/FunctionalButtons/UserEventResponseButtons";
import { EventType } from "./page";
interface ClientEventPageProps {
  userId: string;
  event: EventType;
}

export const responseIconMap = {
  [ResponseStatus.ACCEPTED]: <CheckIcon className="h-8 w-8 text-success" />,
  [ResponseStatus.DECLINED]: <Cross1Icon className="h-8 w-8 text-error" />,
  [ResponseStatus.MAYBE]: <ChatBubbleIcon className="h-8 w-8 text-warning" />,
  [ResponseStatus.PENDING]: <CircleIcon className="h-8 w-8" />,
};

const ClientEventPage: React.FC<ClientEventPageProps> = ({ userId, event }) => {
  const [iEvent, setIEvent] = useImmer(event);
  const form = useForm({
    defaultValues: {
      name: iEvent?.name || "",
      description: iEvent?.description || "",
      date: iEvent?.date?.toJSON().split("T")[0] || "",
      location: iEvent?.location || "",
    },
  });

  const { mutate: updateEvent, isLoading } = useMutation({
    mutationFn: async (d: any) => {
      console.log(d);
      const res = await fetch(`/api/events/${event.id}`, {
        method: "PUT",
        body: JSON.stringify(d),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Something went wrong!");
      }
      return data;
    },
  });

  if (!event?.id) return <div>Event not found</div>;
  const isCreator = iEvent?.creator?.id === userId;

  const onChange = form.handleSubmit((e) => {
    updateEvent({ ...e, date: new Date(e.date) });
  });

  return (
    <>
      <ButtonTray href="/events">
        <h2>Hangout</h2>
      </ButtonTray>
      <form onBlur={onChange} className="card card-compact mt-8 bg-base-200">
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
              <div className="card-title">
                {isCreator ? (
                  <input
                    {...form.register("name")}
                    defaultValue={iEvent?.name || ""}
                    type="text"
                    placeholder="Type here"
                    className="input w-full max-w-xs"
                  />
                ) : (
                  iEvent?.name
                )}
              </div>
              <span>
                {iEvent?.date ? (
                  isCreator ? (
                    <input
                      {...form.register("date")}
                      defaultValue={iEvent.date.toJSON().split("T")[0]}
                      type="date"
                      placeholder="Type here"
                      className="input w-full max-w-xs"
                    />
                  ) : (
                    iEvent.date.toDateString()
                  )
                ) : (
                  ""
                )}
              </span>
            </div>
            {isLoading && (
              <span className="loading loading-spinner loading-md ml-auto"></span>
            )}
          </div>
          <div className="divider my-1">What&apos;s going on</div>
          <div className="prose">
            {isCreator ? (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  {...form.register("description")}
                  defaultValue={iEvent?.description || ""}
                  className="textarea-bordered textarea h-24"
                  placeholder="Description"
                ></textarea>
              </div>
            ) : (
              <p>{iEvent?.description}</p>
            )}
            <div className="flex flex-row">
              <SewingPinIcon className="my-auto h-6 w-6" />
              <h3 className="my-auto">
                Location:{" "}
                {isCreator ? (
                  <input
                    {...form.register("location")}
                    defaultValue={iEvent.location || ""}
                    type="text"
                    placeholder="Type here"
                    className="input w-full max-w-xs"
                  />
                ) : (
                  iEvent?.location
                )}
              </h3>
            </div>
          </div>
          <div className="divider">
            <div className="divider-text">Who&apos;s going</div>
          </div>
          <div className="flex flex-col">
            {iEvent?.attendees?.map((attendee) => (
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
      </form>
      <BottomTray>
        <div className="my-auto">Make Suggestion</div>
        <CircleButtonInset>
          <ChatBubbleIcon className="h-8 w-8 text-warning" />
        </CircleButtonInset>
      </BottomTray>
      <BottomTray>
        <div className="my-auto">Still Going?</div>

        <InviteButton
          response={ResponseStatus.DECLINED}
          onSuccess={(e) =>
            setIEvent((draft) => {
              if (!draft?.attendees) return;
              const attendee = draft?.attendees.find(
                (attendee) => attendee.id === e.userId,
              );

              if (!attendee?.eventResponse) return;

              attendee.eventResponse[0].response = ResponseStatus.DECLINED;
            })
          }
          userId={userId}
          eventId={event.id}
        />
        <InviteButton
          response={ResponseStatus.ACCEPTED}
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
