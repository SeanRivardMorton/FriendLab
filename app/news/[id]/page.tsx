import { getSession } from "../../api/getSession";
import getPost from "../../api/posts/[id]/getPost";
import BottomTray from "../../components/BottomTray";
import ButtonTray from "../../components/ButtonTray";
import DeleteButton from "../../components/DeleteButton.tsx";
import NewsCard from "../NewsCard";

const PostPage = async ({ params }) => {
  const session = await getSession();
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    return <div>Post not found</div>;
  }

  const isAuthor = session?.user?.id === post?.author?.id;

  return (
    <>
      <ButtonTray href="/news" actionSlot={<span></span>}>
        <h1>{post.title}</h1>
      </ButtonTray>
      <NewsCard post={post} />
      <BottomTray>
        {isAuthor && (
          <DeleteButton returnUrl="/news" deleteUrl={`/api/posts/${post.id}`} />
        )}
      </BottomTray>
    </>
  );
};

export default PostPage;
