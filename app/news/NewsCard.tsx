import Image from "next/image";

import Avatar from "../components/Avatar";
import { Post } from "./createPost";
import PostActions from "./PostActions";

const defaultNews: Partial<Post> = {
  title: "Title",
  content:
    "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl quis tincidunt aliquam, nisl nisl lacinia nisl, nec lacinia nisl",
};

const NewsCard = ({ post = defaultNews }) => {
  const dateFormat = post.postedAt
    ? new Date(post.postedAt).toDateString()
    : "";
  if (!post) {
    return <div>Post not found</div>;
  }
  const firstName = post.author?.name?.split(" ")[0];
  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="card-title flex flex-row justify-between">
            <h2>{post.subtitle}</h2>
            <PostActions post={post} />
          </div>
          <div className="ml-4 flex flex-row justify-between">
            <div className="flex flex-row">
              {post?.author?.image && (
                <Avatar className="-ml-3 h-10 w-10" src={post.author.image} />
              )}
              <p className="text-bold ml-2 mt-0">{firstName}</p>
            </div>
            <div>{dateFormat}</div>
          </div>
          <div className="divider"></div>
          <div className="prose whitespace-break-spaces">{post.content}</div>
        </div>
      </div>
    </>
  );
};

export default NewsCard;
