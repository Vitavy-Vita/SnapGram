import { useUserContext } from "@/context/AuthContext";
import { multiFormatDateString } from "@/lib/utils";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";

type PostCardProps = {
  posts: Models.Document[];
};
const PostCard = ({ posts }: PostCardProps) => {
  const { user } = useUserContext();
  if (!posts) return;
  return (
    <ul className="flex flex-col flex-1 gap-9 w-full">
      {posts.map((post, index) => (
        <div className="post-card" key={index}>
          <div className="flex-between">
            <div className="flex items-center gap-3">
              <Link to={`/profile/${post.users.$id}`}>
                <img
                  src={
                    post?.users?.imageUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="rounded-full w-12 lg:h-12"
                />
              </Link>
              <div className="flex flex-col">
                <p className="base-medium lg:body-bold text-light-1">
                  {post.users.name}
                </p>
                <div className="flex-center gap-2 text-light-3">
                  <p className="subtle-semibold lg:small-regular">
                    {multiFormatDateString(post.$createdAt)}
                  </p>
                  -
                  <p className="subtle-semibold lg:small-regular">
                    {post.location}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Link to={`/posts/${post.$id}`}>
            <div className="small-medium lg:base-medium py-5">
              <p>{post.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post.tags.map((tag: string) => (
                  <li key={tag} className="text-light-3">
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>
            <img
              src={post.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="post image"
              className="post-card_img"
            />
          </Link>
          <PostStats post={post} userId={user.id} />
        </div>
      ))}
    </ul>
  );
};

export default PostCard;
