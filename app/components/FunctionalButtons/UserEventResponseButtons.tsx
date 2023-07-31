"use client";
import { CheckIcon, Cross1Icon } from "@radix-ui/react-icons";
import { CircleButton, CircleButtonInset } from "../Form/button";
import { useMutation } from "@tanstack/react-query";
import { ResponseStatus } from "@prisma/client";

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

export const AcceptInviteButton = ({ userId, eventId }) => {
  const acceptInviteQuery = useMutation({
    mutationFn: () =>
      updateUserResponse(userId, eventId, ResponseStatus.ACCEPTED),
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

export const DeclineInviteButton = ({ userId, eventId }) => {
  const declineInviteQuery = useMutation({
    mutationFn: () =>
      updateUserResponse(userId, eventId, ResponseStatus.DECLINED),
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
