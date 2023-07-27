import { Post } from "./createPost";
import PostActions from "./PostActions";

const defaultNews: Partial<Post> = {
  title: "Title",
  content:
    "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl quis tincidunt aliquam, nisl nisl lacinia nisl, nec lacinia nisl",
};

const NewsCard = ({ post = defaultNews }) => {
  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="card-title flex flex-row justify-between">
            <h2>{post.title}</h2>
            <PostActions post={post} />
          </div>
          <div className="flex flex-row justify-between">
            <p className="text-bold"></p>
            <div>{new Date().toDateString()}</div>
          </div>
          <div className="divider"></div>
          <div className="prose">{post.content}</div>
        </div>
      </div>
    </>
  );
};

export default NewsCard;
