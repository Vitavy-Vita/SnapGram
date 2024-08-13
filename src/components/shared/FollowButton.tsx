import { useUserContext } from "@/context/AuthContext";
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
  followedUser: Models.Document;
};
const FollowButton = ({ followedUser }: PropsButton) => {
  const { user } = useUserContext();
  const { data: currentUser } = useGetCurrentUser();
  const [isFollowed, setIsFollowed] = useState(false);

  const { mutate: followUser } = useFollowUser();
  const { mutate: unfollowUser, isPending: isUnfollowing } = useUnfollowUser();

  const followedUserRecord = currentUser?.follows.find(
    (record: Models.Document) => record.followed.$id === followedUser.$id
  );
  useEffect(() => {
    if (currentUser) {
      setIsFollowed(!!followedUserRecord);
    }
  }, [currentUser]);

  const handleFollow = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(followedUserRecord);

    if (followedUserRecord) {
      setIsFollowed(false);
      unfollowUser(followedUserRecord.$id);
      return;
    }

    followUser({ followId: followedUser.$id, userId: user.id });
    setIsFollowed(true);
  };
  return (
    <>
      {isUnfollowing ? (
        <Button className="shad-button_primary">
          <Loader />
        </Button>
      ) : (
        <Button
          className="shad-button_primary"
          onClick={(e) => handleFollow(e)}
        >
          {isFollowed ? "Unfollow" : "Follow"}
        </Button>
      )}
    </>
  );
};

export default FollowButton;
