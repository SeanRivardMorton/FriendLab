// import { GetStaticProps } from "next";
import { PrismaClient } from "@prisma/client";
import prisma from "../../lib/prisma";

async function getAllPosts() {
  const feed = await prisma.post.findMany({
    where: { published: true },
  });

  return feed;
}

export default async () => {
  const posts = await getAllPosts();

  return (
    <div>
      {posts.map((u) => {
        return <div key={u.id}>{u.title}</div>;
      })}
    </div>
  );
};
