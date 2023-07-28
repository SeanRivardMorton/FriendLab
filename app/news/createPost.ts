import { Prisma } from "@prisma/client";
import prisma from "../../lib/prisma";

const createPost = async (post) => {
  const response = await prisma.post.create({
    data: post,
  });

  return response;
};

export default createPost;

export type Post = Prisma.PostGetPayload<{
  include: { author: true };
}>;
