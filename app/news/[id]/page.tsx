import { TrashIcon } from "@radix-ui/react-icons";
import getPost from "../../api/posts/[id]/getPost";
import BottomTray from "../../components/BottomTray";
import ButtonTray from "../../components/ButtonTray";
import DeleteButton from "../../components/DeleteButton.tsx";
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
      <BottomTray>
        <DeleteButton returnUrl="/news" deleteUrl={`/api/posts/${post.id}`} />
      </BottomTray>
    </>
  );
};

export default PostPage;
