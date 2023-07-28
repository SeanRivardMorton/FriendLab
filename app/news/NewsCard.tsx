import { Post } from "./createPost";
import PostActions from "./PostActions";
import Image from "next/image";

const defaultNews: Partial<Post> = {
  title: "Title",
  content:
    "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl quis tincidunt aliquam, nisl nisl lacinia nisl, nec lacinia nisl",
};

const NewsCard = ({ post = defaultNews }) => {
  const dateFormat = new Date().toDateString();
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
          <div className="flex flex-row justify-between ml-4">
            <div className="flex flex-row">
              {post?.author?.image && (
                <div className="btn btn-circle btn-xs ring-2 ring-white -ml-4">
                  <Image
                    className="rounded-full"
                    src={post.author.image}
                    width={44}
                    height={44}
                    alt={post.author.name || "Author Image"}
                  />
                </div>
              )}
              <p className="text-bold mt-auto ml-2">{firstName}</p>
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
