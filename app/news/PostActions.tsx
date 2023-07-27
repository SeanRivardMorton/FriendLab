"use client";
import { MinusIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { CircleButtonInset } from "../components/Form/button";

const deletePost = async (id) => {
  return fetch(`/api/posts/${id}`, {
    method: "DELETE",
  });
};

const PostActions = ({ post }) => {
  const router = useRouter();
  const deleteQuery = useMutation({
    mutationFn: () => deletePost(post.id),
    onSuccess: () => {
      router.push("/");
    },
  });
  return (
    <div>
      {deleteQuery.isLoading && (
        <span className="loading mr-2 text-primary loading-bars loading-md"></span>
      )}
      <CircleButtonInset onClick={deleteQuery.mutate} small>
        <TrashIcon className="h-6 w-6 text-error" />
      </CircleButtonInset>
      <CircleButtonInset small>
        <MinusIcon className="h-6 w-6 text-warning" />
      </CircleButtonInset>
      <CircleButtonInset small>
        <PlusIcon className="h-6 w-6 text-success" />
      </CircleButtonInset>
    </div>
  );
};

export default PostActions;
