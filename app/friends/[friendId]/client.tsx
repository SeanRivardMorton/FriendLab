"use client";

import { ChatBubbleIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";

import BottomTray from "../../components/BottomTray";
import ButtonTray from "../../components/ButtonTray";
import DeleteButton from "../../components/DeleteButton.tsx";
import { CircleButtonInset } from "../../components/Form/button";
import FriendList from "../../components/FriendList";

const addFriend = async (friendId) => {
  const res = await fetch(`/api/friends/add/${friendId}`, {
    method: "POST",
  });
  return res.json();
};

const ClientFriendPage = ({ friend, friendsOfFriend, isFriend }) => {
  const addFriendQuery = useMutation({
    mutationFn: (id) => addFriend(id),
    onSuccess: (data) => {},
  });
  return (
    <>
      <ButtonTray
        href="/friends"
        actionSlot={
          <div className="rounded-full bg-base-100 p-3">
            {friend?.image && (
              <Image
                src={friend?.image}
                alt="user image"
                className="h-10 w-10 rounded-full"
                width={24}
                height={24}
              />
            )}
          </div>
        }
      >
        <h1>{friend.name}</h1>
      </ButtonTray>
      <FriendList friends={friendsOfFriend} />
      <BottomTray>
        {!isFriend && (
          <CircleButtonInset>
            {addFriendQuery.isLoading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              <PlusIcon
                onClick={() => addFriendQuery.mutate(friend.id)}
                className="h-8 w-8 text-success"
              />
            )}
          </CircleButtonInset>
        )}
        {isFriend && (
          <>
            <CircleButtonInset>
              {addFriendQuery.isLoading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                <ChatBubbleIcon className="h-8 w-8" />
              )}
            </CircleButtonInset>
            <DeleteButton deleteUrl={`/api/friends/${friend.id}`} returnUrl="/friends" />
          </>
        )}
      </BottomTray>
    </>
  );
};

export default ClientFriendPage;
