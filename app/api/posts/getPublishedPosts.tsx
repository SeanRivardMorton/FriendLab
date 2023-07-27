import prisma from "../../../lib/prisma";

const getPublishedPosts = () => {
  const res = prisma.post.findMany({
    where: {
      published: true,
    },
  });
  return res;
};

export default getPublishedPosts;
