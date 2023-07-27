"use client";
import ButtonTray from "../../components/ButtonTray";
import Image from "next/image";
import { CheckIcon, MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import React from "react";
import { CircleButton, CircleButtonInset } from "../../components/Form/button";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

const postGroup = async (group) => {
  const response = await fetch("/api/groups", {
    method: "POST",
    body: JSON.stringify({ members: group }),
  });
  const data = await response.json();
  return data;
};

const ClientGroupCreatePage = (props) => {
  const [friends, setFriends] = React.useState(props.friends);
  const [selectedFriends, setSelectedFriends] = React.useState<
    typeof props.friends
  >([]);
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: () => postGroup(selectedFriends),
    onSuccess: (newGroup) => {
      router.push(`/groups/${newGroup.id}`);
    },
  });

  const addFriendToGroup = (friend) => {
    setFriends(friends.filter((f) => f.id !== friend.id));
    setSelectedFriends([...selectedFriends, friend]);
  };

  const removeFriendFromGroup = (friend) => {
    setSelectedFriends(selectedFriends.filter((f) => f.id !== friend.id));
    setFriends([...friends, friend]);
  };

  return (
    <div>
      <ButtonTray
        actionSlot={
          <CircleButtonInset
            isLoading={mutation.isLoading}
            onClick={() => mutation.mutate()}
            className="btn btn-circle bg-base-100 text-success"
          >
            <CheckIcon className="h-8 w-8" />
          </CircleButtonInset>
        }
      >
        <h1>New Group</h1>
      </ButtonTray>

      <ul className="mr-2">
        <div className="divider"></div>
        {selectedFriends.map((friend) => (
          <React.Fragment key={friend.id}>
            <li>
              <div className="flex flex-row my-2 ml-2 justify-between">
                <div className="flex flex-row">
                  <div className="btn btn-circle bg-base-200">
                    <Image
                      src={friend.image}
                      alt={friend.name}
                      height={44}
                      width={44}
                      className="rounded-full h-12 w-12"
                    />
                  </div>
                  <h2 className="text-2xl my-auto ml-4">{friend.name}</h2>
                </div>
                <CircleButton onClick={() => removeFriendFromGroup(friend)}>
                  <MinusIcon className="h-8 w-8" />
                </CircleButton>
              </div>
            </li>
            <div className="divider"></div>
          </React.Fragment>
        ))}
      </ul>
      <div className="flex flex-row my-2 ml-2 justify-between">
        <div className="flex flex-row">
          <h2 className="text-2xl my-auto ml-4">Invite Friends</h2>
          {/* <PaperPlaneIcon className="h-8 w-8 ml-8" /> */}
        </div>
      </div>
      <ul className="mr-2">
        <div className="divider"></div>
        {friends.map((friend) => (
          <React.Fragment key={friend.id}>
            <li>
              <div className="flex flex-row my-2 ml-2 justify-between">
                <div className="flex flex-row">
                  <div className="btn btn-circle bg-base-200">
                    <Image
                      src={friend.image}
                      alt={friend.name}
                      height={44}
                      width={44}
                      className="rounded-full h-12 w-12"
                    />
                  </div>
                  <h2 className="text-2xl my-auto ml-4">{friend.name}</h2>
                </div>
                <CircleButton
                  href={`/friends/${friend.id}`}
                  onClick={() => addFriendToGroup(friend)}
                >
                  <PlusIcon className="h-8 w-8" />
                </CircleButton>
              </div>
            </li>
            <div className="divider"></div>
          </React.Fragment>
        ))}
      </ul>
      {/* <CreateGroupForm /> */}
    </div>
  );
};

export default ClientGroupCreatePage;
