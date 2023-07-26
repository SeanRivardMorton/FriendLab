"use client";
import {
  ChevronLeftIcon,
  MinusIcon,
  PaperPlaneIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

const addMemberToGroup = async (groupId, memberId) => {
  const response = await fetch(`/api/groups/${groupId}/members`, {
    method: "POST",
    body: JSON.stringify({ memberId }),
  });
  return response.json();
};

const removeMemberFromGroup = async (groupId, memberId) => {
  const response = await fetch(`/api/groups/${groupId}/members`, {
    method: "DELETE",
    body: JSON.stringify({ memberId }),
  });
  return response.json();
};

const MembersList = ({ members, groupId, friends }) => {
  const addMutation = useMutation({
    mutationFn: (memberId) => addMemberToGroup(groupId, memberId),
  });
  const removeMutation = useMutation({
    mutationFn: (memberId) => removeMemberFromGroup(groupId, memberId),
  });
  return (
    <>
      <div className="card card-compact bg-base-200 w-2/3 rounded-e-full mb-8">
        <div className="card-body">
          <div className="card-title flex flex-row justify-between">
            <div className="flex flex-row">
              <Link
                href={`/groups/${groupId}`}
                className="bg-base-100 btn btn-circle mr-4"
              >
                <ChevronLeftIcon className="h-8 w-8" />
              </Link>
              <h1 className="my-auto">Members</h1>
            </div>
            <button className="btn btn-circle bg-base-100">
              <PlusIcon onClick={() => {}} className="h-8 w-8" />
            </button>
          </div>
        </div>
      </div>
      <ul className="h-full">
        {members.map((member) => (
          <li key={member.id}>
            <div className="flex flex-row my-2 ml-2 justify-between">
              <div className="flex flex-row">
                <div className="btn btn-circle bg-base-200">
                  <Image
                    src={member?.image}
                    alt={member.name}
                    height={44}
                    width={44}
                    className="rounded-full h-12 w-12"
                  />
                </div>
                <h2 className="text-2xl my-auto ml-4">{member.name}</h2>
              </div>
              <button className="btn btn-circle mr-4">
                {!removeMutation.isLoading ? (
                  <MinusIcon
                    onClick={() => removeMutation.mutate(member.id)}
                    className="h-8 w-8 "
                  />
                ) : (
                  <span className="loading loading-spinner loading-md"></span>
                )}
              </button>
            </div>
            <div className="divider"></div>
          </li>
        ))}
      </ul>
      <div className="flex flex-row my-2 ml-2 justify-between">
        <div className="flex flex-row">
          <h2 className="text-2xl my-auto ml-4">Invite Friends</h2>
          {/* <PaperPlaneIcon className="h-8 w-8 ml-8" /> */}
        </div>
      </div>
      <div className="divider"></div>
      <ul className="h-full">
        {friends.map((friend) => (
          <li key={friend.id}>
            <div className="flex flex-row my-2 ml-2 justify-between">
              <div className="flex flex-row">
                <div className="btn btn-circle bg-base-200">
                  <Image
                    src={friend?.image}
                    alt={friend.name}
                    height={44}
                    width={44}
                    className="rounded-full h-12 w-12"
                  />
                </div>
                <h2 className="text-2xl my-auto ml-4">{friend.name}</h2>
              </div>
              <button className="btn btn-circle mr-4">
                {!addMutation.isLoading ? (
                  <PlusIcon
                    onClick={() => addMutation.mutate(friend.id)}
                    className="h-8 w-8 "
                  />
                ) : (
                  <span className="loading loading-spinner loading-md"></span>
                )}
              </button>
            </div>
            <div className="divider"></div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MembersList;
