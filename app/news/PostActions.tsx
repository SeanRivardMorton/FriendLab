"use client";
import {
  MinusIcon,
  PlusIcon,
  Share1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
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
      <div className="flex flex-row justify-end">
        <CircleButtonInset>
          {deleteQuery.isLoading ? (
            <span className="loading loading-spinner loading-md text-primary"></span>
          ) : (
            <Share1Icon className="h-6 w-6 text-primary" />
          )}
        </CircleButtonInset>
      </div>
    </div>
  );
};

export default PostActions;

{
  /* <CircleButtonInset onClick={deleteQuery.mutate} small>
{deleteQuery.isLoading ? (
  <span className="loading loading-spinner loading-md text-error"></span>
) : (
  <TrashIcon className="h-6 w-6 text-error" />
)}
</CircleButtonInset> */
}
