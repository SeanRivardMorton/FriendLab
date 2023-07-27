import prisma from "../../../../lib/prisma";

const getAllPostsFromUser = async (userId) => {
  const posts = await prisma.post.findMany({
    where: {
      authorId: userId,
    },
  });

  return posts;
};

export default getAllPostsFromUser;
