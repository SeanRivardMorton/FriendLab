"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const deleteGroup = async (groupId) => {
  const response = await fetch(`/api/groups/${groupId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      groupId,
    }),
  }).then((d) => {
    return d.json();
  });
  return response;
};

const DeleteGroupButton = ({ groupId }) => {
  const router = useRouter();
  const mutate = useMutation(
    async (groupId) => {
      await deleteGroup(groupId);
    },
    {
      onSuccess: () => {
        router.push("/");
      },
    }
  );

  return (
    <button
      onClick={() => mutate.mutate(groupId)}
      className="btn btn-error btn-sm"
    >
      Delete
    </button>
  );
};

export default DeleteGroupButton;
