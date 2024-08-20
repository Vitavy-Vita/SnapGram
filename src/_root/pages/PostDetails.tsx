import Loader from "@/components/shared/Loader";
import PostStats from "@/components/shared/PostStats";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";

import {
  useDeletePost,
  useGetPostById,
} from "@/lib/react-query/queriesAndMutations";
import { multiFormatDateString } from "@/lib/utils";
import { ToastAction } from "@radix-ui/react-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { data: post, isPending } = useGetPostById(id || "");
  const { user } = useUserContext();
  const { mutateAsync: deletePost } = useDeletePost();

  async function handleDeletePost() {
    if (post) {
      const postDeleted = await deletePost({
        postId: post.$id,
        imageId: post?.imageId,
        userId: user.id
      });
      if (!postDeleted) {
        toast({ title: "please try again" });
      }
      return navigate("/");
    }
  }
  const showToast = () => {
    toast({
      title: "Are you sure you want to delete this post ?",
      description: "This action cannot be undone.",
      action: (
        <ToastAction altText="Confirm" onClick={handleDeletePost}>
          Confirm
        </ToastAction>
      ),
    });
  };
  return (
    <div className="post_details-container">
      {isPending ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img
            src={post?.imageUrl}
            alt="post-image"
            className="post_details-img"
          />
          <div className="post_details-info">
            <div className="flex-between w-full">
              {" "}
              <Link
                to={`/profile/${post?.users.$id}`}
                className="flex items-center gap-3"
              >
                <img
                  src={
                    post?.users?.imageUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="rounded-full w-8 h:8 lg:w-12 lg:h-12"
                />

                <div className="flex flex-col gap-1">
                  <p className="base-medium lg:body-bold text-light-1">
                    {post?.users.name}
                  </p>
                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular">
                      {multiFormatDateString(post?.$createdAt)}
                    </p>
                    -
                    <p className="subtle-semibold lg:small-regular">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>
              <div className="flex-center gap-4">
                <Link
                  to={`/update-post/${post?.$id}`}
                  className={`${user.id !== post?.users.$id && "hidden"}`}
                >
                  <img
                    src="/assets/icons/edit.svg"
                    alt="edit-button"
                    width={24}
                    height={24}
                  />
                </Link>
                <Button
                  onClick={showToast}
                  className={`ghost_details-delete_btn ${
                    user.id !== post?.users.$id && "hidden"
                  }`}
                >
                  <img
                    src="/assets/icons/delete.svg"
                    alt="delete-button"
                    width={24}
                    height={24}
                  />
                </Button>
              </div>
            </div>
            <hr className="border w-full border-dark-4/80" />
            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p>{post?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag: string) => (
                  <li key={tag} className="text-light-3 small-regular">
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full">
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
