"use client";
import { FileIcon, PaperPlaneIcon, PlusIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";

import { authOptions } from "../api/auth/[...nextauth]";
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

const WritingNewsCard = ({ userId }) => {
  const router = useRouter();
  const mutate = useMutation({
    mutationFn: (post: Post) => postPost(post),
    onSuccess: (newPost: Post) => {
      router.push(`/news/${newPost.id}`);
    },
  });

  const form = useForm<Post>();

  const savePost = form.handleSubmit((data) => {
    mutate.mutate({
      ...data,
      authorId: userId,
      postedAt: new Date(),
      published: true,
    });
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
            <div className="flex flex-row justify-start w-full">
              <input
                {...form.register("subtitle")}
                type="text"
                placeholder="subtitle"
                className="input input-bordered text-md w-2/4 max-w-xs"
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
          {/* This is here for justify between, and future changes to the thumb tray */}

          <div className="w-1/6">
            <button className="btn btn-circle bg-base-100 text-success">
              {mutate.isLoading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                <PaperPlaneIcon className="h-8 w-8" />
              )}
            </button>
          </div>
        </div>
      </BottomTray>
    </form>
  );
};

export default WritingNewsCard;
