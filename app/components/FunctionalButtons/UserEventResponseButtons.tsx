"use client";
import { ResponseStatus } from "@prisma/client";
import { CheckIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import React from "react";

import { responseIconMap } from "../../events/[id]/client";
import { CircleButton } from "../Form/button";

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

export const AcceptInviteButton = ({ userId, eventId, onSuccess }) => {
  const acceptInviteQuery = useMutation({
    mutationFn: () =>
      updateUserResponse(userId, eventId, ResponseStatus.ACCEPTED),
    onSuccess: (e) => onSuccess?.(e),
  });
  return (
    <CircleButton
      className="my-auto"
      onClick={() => acceptInviteQuery.mutate()}
    >
      {acceptInviteQuery.isLoading ? (
        <span className="loading loading-spinner loading-md"></span>
      ) : (
        <CheckIcon className="h-8 w-8 text-success" />
      )}
    </CircleButton>
  );
};

export const DeclineInviteButton = ({ userId, eventId, onSuccess }) => {
  const declineInviteQuery = useMutation({
    mutationFn: () =>
      updateUserResponse(userId, eventId, ResponseStatus.DECLINED),
    onSuccess: (e) => onSuccess?.(e),
  });
  return (
    <CircleButton
      className="my-auto"
      onClick={() => declineInviteQuery.mutate()}
    >
      {declineInviteQuery.isLoading ? (
        <span className="loading loading-spinner loading-md"></span>
      ) : (
        <Cross1Icon className="h-8 w-8 text-error" />
      )}
    </CircleButton>
  );
};

interface InviteButton {
  userId: string;
  eventId: string;
  onSuccess?: (e) => void;
  response?: ResponseStatus;
}

export const InviteButton: React.FC<InviteButton> = ({
  userId,
  eventId,
  onSuccess,
  response = ResponseStatus.PENDING,
}) => {
  const declineInviteQuery = useMutation({
    mutationFn: () => updateUserResponse(userId, eventId, response),
    onSuccess: (e) => onSuccess?.(e),
  });
  return (
    <CircleButton
      className="my-auto"
      onClick={() => declineInviteQuery.mutate()}
    >
      {declineInviteQuery.isLoading ? (
        <span className="loading loading-spinner loading-md"></span>
      ) : (
        responseIconMap[response]
      )}
    </CircleButton>
  );
};
