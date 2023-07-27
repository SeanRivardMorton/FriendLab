import prisma from "../../../../lib/prisma";

const getPost = (postId) => {
  const res = prisma.post.findUnique({
    where: {
      id: postId,
    },
  });
  return res;
};

export default getPost;
