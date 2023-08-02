import { ChevronRightIcon, PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

import { getSession } from "../api/getSession";
import getPublishedPosts from "../api/posts/getPublishedPosts";
import ButtonTray from "../components/ButtonTray";
import { CircleButtonLinkInset } from "../components/Form/button";

const NewsPage = async () => {
  const [session, posts] = await Promise.all([
    getSession(),
    getPublishedPosts(),
  ]);

  if (!session) return redirect("/login");

  return (
    <>
      <ButtonTray
        actionSlot={
          <CircleButtonLinkInset href="/news/create">
            <PlusIcon className="h-8 w-8" />
          </CircleButtonLinkInset>
        }
      >
        <h1>Friend Lab News</h1>
      </ButtonTray>
      <ul>
        <div className="divider"></div>
        {posts?.map((post) => (
          <>
            <li key={post.id}>
              <Link
                href={`/news/${post.id}`}
                className="flex flex-row my-2 ml-2 justify-between"
              >
                <div className="flex flex-row">
                  <h2 className="text-2xl my-auto ml-4">{post.title}</h2>
                </div>
                <div className="mr-2">
                  <ChevronRightIcon className="h-8 w-8" />
                </div>
              </Link>
            </li>
            <div className="divider"></div>
          </>
        ))}
      </ul>
    </>
  );
};

export default NewsPage;
