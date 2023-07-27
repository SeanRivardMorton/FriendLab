import getPost from "../../api/posts/[id]/getPost";
import ButtonTray from "../../components/ButtonTray";
import NewsCard from "../NewsCard";

const PostPage = async ({ params }) => {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <ButtonTray href="/news">
        <h1>Post</h1>
      </ButtonTray>
      <NewsCard post={post} />
    </>
  );
};

export default PostPage;
