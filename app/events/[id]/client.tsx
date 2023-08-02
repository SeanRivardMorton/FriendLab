"use client";

import { EventResponse, ResponseStatus } from "@prisma/client";
import { CheckIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import React from "react";

import { Event } from "../../api/events/getEventById";
import GroupUserAvatarsRow, {
  EventUserAvatarsRow,
} from "../../groups/GroupUserAvatarRow";

interface ClientEventPageProps {
  userId: string;
  event: Event;
}

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
      <div className="flex flex-row justify-between">
        <div className="card card-compact">
          <div className="card-body">
            <p>Date: {date}</p>
            <div className="card-title">{event.description}</div>
            <div className="divider"></div>
            <p className="text-lg">Invited</p>
            <EventUserAvatarsRow attendees={event.attendees} />
            <div className="divider"></div>
            <div className="">
              <p className="text-lg mb-2">Change your mind?</p>
              <button
                onClick={() =>
                  userResponseQuery.mutate(ResponseStatus.DECLINED)
                }
                className="btn btn-circle text-error"
              >
                <Cross1Icon className="h-8 w-8" />
              </button>
              <button
                onClick={() =>
                  userResponseQuery.mutate(ResponseStatus.ACCEPTED)
                }
                className="btn btn-circle text-success"
              >
                <CheckIcon className="h-8 w-8" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientEventPage;
