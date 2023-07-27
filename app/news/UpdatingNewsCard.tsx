"use client";
import { FileIcon, PaperPlaneIcon, PlusIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import BottomTray from "../components/BottomTray";
import ButtonTray from "../components/ButtonTray";
import { Post } from "./createPost";

const postPost = async (post): Promise<Post> => {
  const data = await fetch(`/api/posts/create`, {
    method: "POST",
    body: JSON.stringify(post),
  });
  return data.json();
};

interface UpdatingNewsCard {
  post: Post;
}

const UpdatingNewsCard: React.FC<UpdatingNewsCard> = (props) => {
  const router = useRouter();
  const [post, setPost] = React.useState(props.post);
  const mutate = useMutation({
    mutationFn: (post: Post) => postPost(post),
    onSuccess: (newPost: Post) => {
      console.log(newPost);
      setPost(newPost);
    },
  });

  const form = useForm({
    defaultValues: props.post,
  });
  const savePost = form.handleSubmit((data) => {
    mutate.mutate(data);
  });
  return (
    <form onSubmit={savePost}>
      <ButtonTray>
        <button>News</button>
      </ButtonTray>
      <div className="card">
        <div className="card-body">
          <div className="card-title flex flex-col">
            <div className="flex flex-row justify-start w-full">
              <input
                {...form.register("title")}
                type="text"
                placeholder="Title"
                className="input input-bordered text-3xl w-full max-w-xs"
              />
            </div>
            <div className="divider"></div>
            <textarea
              {...form.register("content")}
              className="textarea textarea-bordered w-full h-48"
              placeholder="Bio"
            ></textarea>
          </div>
        </div>
      </div>
      <BottomTray>
        <div className="flex flex-row justify-between w-full">
          <div>
            <button type="submit" className="btn btn-circle bg-base-100">
              <FileIcon className="h-8 w-8" />
            </button>
          </div>
          <div className="">
            <button className="btn btn-circle bg-base-100">
              <PlusIcon className="h-8 w-8" />
            </button>
            <button className="btn btn-circle bg-base-100">
              <PaperPlaneIcon className="h-8 w-8" />
            </button>
          </div>
        </div>
      </BottomTray>
    </form>
  );
};

export default UpdatingNewsCard;
