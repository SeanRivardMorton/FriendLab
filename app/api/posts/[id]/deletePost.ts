import prisma from "../../../../lib/prisma";

const deletePost = async (postId) => {
  console.log("asdfasdfasdf", postId);
  const res = await prisma.post.delete({
    where: {
      id: postId,
    },
  });
  return res;
};

export default deletePost;
