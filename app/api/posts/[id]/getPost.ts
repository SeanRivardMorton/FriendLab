import prisma from "../../../../lib/prisma";

const getPost = (postId) => {
  const res = prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      author: true,
    },
  });
  return res;
};

export default getPost;
