import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import {
  useFollowUser,
  useGetCurrentUser,
  useUnfollowUser,
} from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import Loader from "./Loader";

type PropsButton = {
  followedUser?: Models.Document;
};
const FollowButton = ({ followedUser }: PropsButton) => {
  const { data: currentUser } = useGetCurrentUser();
  const [isFollowed, setIsFollowed] = useState(false);

  const { mutate: followUser, isPending: isFollowing } = useFollowUser();
  const { mutate: unfollowUser, isPending: isUnfollowing } = useUnfollowUser();

  const followedUserRecord = currentUser?.follows.find(
    (record: Models.Document) => record.followed.$id === followedUser?.$id
  );
  useEffect(() => {
    if (currentUser) {
      setIsFollowed(!!followedUserRecord);
    }
  }, [currentUser]);

  const handleFollow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (followedUserRecord) {
      setIsFollowed(false);
      unfollowUser(followedUserRecord.$id);
      return;
    }

    followUser({
      followId: followedUser?.$id || "",
      userId: currentUser?.$id || "",
    });
    setIsFollowed(true);
  };
  return (
    <>
      {isUnfollowing || isFollowing ? (
        <Button className="shad-button_primary">
          <Loader />
        </Button>
      ) : (
        <Button
          className={
            isFollowed ? "shad-button_secondary" : "shad-button_primary"
          }
          onClick={(e) => handleFollow(e)}
        >
          {isFollowed ? "Unfollow" : "Follow"}
        </Button>
      )}
    </>
  );
};

export default FollowButton;
