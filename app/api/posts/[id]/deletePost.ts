import prisma from "../../../../lib/prisma";

const deletePost = async (postId) => {
  const res = await prisma.post.delete({
    where: {
      id: postId,
    },
  });
  return res;
};

export default deletePost;
