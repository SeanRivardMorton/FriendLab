"use client";
import { CheckIcon, Cross1Icon, TrashIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";

const DeleteButton = ({ deleteUrl, returnUrl }) => {
  const [isDeleting, setIsDeleting] = React.useState(false);
  const router = useRouter();
  const deleteQuery = useMutation({
    mutationFn: () => fetch(deleteUrl, { method: "DELETE" }),
    onSuccess: () => {
      router.push(returnUrl);
    },
  });

  const toggleDeleting = () => setIsDeleting((prev) => !prev);

  const cancelDeleting = () => setIsDeleting(false);

  return (
    <>
      {isDeleting ? (
        <>
          <button
            onClick={() => deleteQuery.mutate()}
            className="btn btn-circle bg-base-100 text-success"
          >
            {deleteQuery.isLoading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              <CheckIcon className="w-8 h-8" />
            )}
          </button>
          <button className="btn btn-circle bg-base-100 text-error">
            <Cross1Icon onClick={cancelDeleting} className="w-8 h-8" />
          </button>
        </>
      ) : (
        <button
          onClick={toggleDeleting}
          className="btn btn-circle bg-base-100 text-error"
        >
          <TrashIcon className="w-8 h-8" />
        </button>
      )}
    </>
  );
};

export default DeleteButton;
