import {
  useDeleteSavedPost,
  useLikePost,
  useSavePost,
  useGetCurrentUser,
} from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import { useEffect, useState } from "react";
import Loader from "./Loader";

type PostStatsProps = {
  post?: Models.Document;
  userId: string;
};
const PostStats = ({ post, userId }: PostStatsProps) => {
  const likesList = post?.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likedPosts } = useLikePost();
  const { mutate: savedPosts, isPending: isLoadingSave } = useSavePost();
  const { mutate: deleteSavedPosts, isPending: isDeletingSaved } =
    useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();
  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post?.$id
  );

  useEffect(() => {
    // automatic boolean assignement
    // setIsSaved(savedPostRecord ? true : false)
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);
  const handleLikePost = (e: React.MouseEvent) => {
    // prevent trigger of parents elements onclick fn
    e.stopPropagation();

    // looking inside likesList if current user has already liked
    let newLikes = [...likes];
    const hasLiked = newLikes.includes(userId);

    // if the userId is already there, removes it from the array
    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      // add the userId to the array
      newLikes.push(userId);
    }
    setLikes(newLikes);
    likedPosts({ postId: post?.$id || "", likesArray: newLikes });
  };

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      deleteSavedPosts(savedPostRecord.$id);
      return;
    }
    setIsSaved(true);
    savedPosts({ postId: post?.$id || "", userId });
  };
  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          src={
            checkIsLiked(likes, userId)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"
          }
          alt="liked icon"
          width={24}
          height={24}
          onClick={handleLikePost}
          className="cursor-pointer"
        />

        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>
      <div className="flex gap-2">
        {isLoadingSave || isDeletingSaved ? (
          <Loader />
        ) : (
          <img
            src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
            alt="liked icon"
            width={24}
            height={24}
            onClick={handleSavePost}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default PostStats;
