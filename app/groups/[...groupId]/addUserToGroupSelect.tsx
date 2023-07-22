"use client";

import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";

const addFriendToGroup = async (friendId, groupId) => {
  console.log(friendId);
  const response = await fetch(`/api/groups/${groupId}`, {
    method: "POST",
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
      <select {...form.register("friendId")} className="select select-bordered">
        <option disabled>Pick one</option>
        {friends &&
          friends?.map((friend) => (
            <option
              className="text-white"
              value={friend.friend.id}
              key={friend.friend.id}
            >
              {friend.friend.name}
            </option>
          ))}
      </select>
      <button type="submit" className="btn btn-primary mt-4">
        Add
      </button>
    </form>
  );
};

export default AddUserToGroupButton;
