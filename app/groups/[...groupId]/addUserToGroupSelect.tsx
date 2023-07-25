"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";

const addFriendToGroup = async (friendId, groupId) => {
  const response = await fetch(`/api/groups/${groupId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      friendId,
      groupId,
    }),
  }).then((d) => {
    return d.json();
  });

  return response;
};

const AddUserToGroupButton = ({ friends }) => {
  const groupId = usePathname()?.split("groups/")[1];
  const form = useForm({
    defaultValues: {
      friendId: "",
    },
  });

  const onSubmit = form.handleSubmit(({ friendId }) => {
    addFriendToGroup(friendId, groupId);
  });

  return (
    <form onSubmit={onSubmit}>
      <button type="submit" className="btn btn-primary mt-4">
        Add
      </button>
    </form>
  );
};

export default AddUserToGroupButton;
