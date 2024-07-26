import { useUserContext } from "@/context/AuthContext";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";

type GridSavedPostListProps = {
  savedPosts: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
};
const GridSavedPostList = ({
  savedPosts,
  showUser = true,
  showStats = true,
}: GridSavedPostListProps) => {
  const { user } = useUserContext();
  return (
    <ul className="grid-container">
      {savedPosts &&
        savedPosts.map((post) => (
          <li key={post.$id} className="relative min-w-80 h-80">
            <Link to={`/posts/${post.$id}`} className="grid-post_link">
              <img
                src={post.post.imageUrl}
                alt="post"
                className="h-full w-full object-cover"
              />
            </Link>
            <div className="grid-post_user">
              {showUser && (
                <div className="flex item-center justify-start gap-2 flex-1">
                  <img
                    src={post.post.users.imageUrl}
                    alt="creator"
                    className="h-8 w-8 rounded-full"
                  />
                  <p className="line-clamp-1">{post.post.users.name}</p>
                </div>
              )}
              {showStats && <PostStats post={post.post} userId={user.id} />}
            </div>
          </li>
        ))}
    </ul>
  );
};

export default GridSavedPostList;
