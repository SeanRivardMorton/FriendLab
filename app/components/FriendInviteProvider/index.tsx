"use client";

import { useMutation } from "@tanstack/react-query";
import React from "react";

const addFriends = async () => {
  if (!localStorage) return;
  const friendId = localStorage.getItem("friendId") || null;
  if (!friendId) return;
  if (friendId === null) return;
  const response = await fetch("/api/friends/add", {
    method: "POST",
    body: JSON.stringify({ friendId }),
  });
  const data = await response.json();
  return data;
};

const useFriendInvite = () => {
  const { mutate: makeFriends } = useMutation({
    mutationKey: ["friendInvite"],
    mutationFn: () => addFriends(),
    onSuccess: () => {
      localStorage.removeItem("friendId");
    },
  });

  return { makeFriends };
};

const FriendInviteProvider = () => {
  const { makeFriends } = useFriendInvite();

  React.useEffect(() => {
    makeFriends();
  }, []);

  return <div></div>;
};

export default FriendInviteProvider;
