"use client";

import ButtonTray from "../../components/ButtonTray";
import Image from "next/image";
import FriendList from "../../components/FriendList";
import BottomTray from "../../components/BottomTray";
import { CircleButtonInset } from "../../components/Form/button";
import { ChatBubbleIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";

const addFriend = async (friendId) => {
  const res = await fetch(`/api/friends/add/${friendId}`, {
    method: "POST",
  });
  return res.json();
};

const ClientFriendPage = ({ friend, friendsOfFriend, isFriend }) => {
  const addFriendQuery = useMutation({
    mutationFn: (id) => addFriend(id),
    onSuccess: (data) => {
      console.log("yay", data);
    },
  });
  return (
    <>
      <ButtonTray
        href="/friends"
        actionSlot={
          <div className="p-3 rounded-full bg-base-100">
            {friend?.image && (
              <Image
                src={friend?.image}
                alt="user image"
                className="rounded-full h-10 w-10"
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
            {/* <CircleButtonInset>
              {addFriendQuery.isLoading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                <TrashIcon className="h-8 w-8 text-error" />
              )}
            </CircleButtonInset> */}
          </>
        )}
      </BottomTray>
    </>
  );
};

export default ClientFriendPage;
