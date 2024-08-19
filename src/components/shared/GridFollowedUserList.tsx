import { Models } from "appwrite";
import { Link } from "react-router-dom";

type GridFollowedUserListProps = {
  followedUsers: Models.Document[];
};
const GridFollowedUserList = ({ followedUsers }: GridFollowedUserListProps) => {
  return (
    <div className="user-grid">
      {followedUsers?.map((followedUser, index) => (
        <div className="flex flex-col items-center gap-2" key={index}>
          <Link
            to={`/profile/${followedUser.followed.$id}`}
            className="flex gap-3 items-center"
          >
            <img
              src={
                followedUser.followed.imageUrl ||
                "/assets/images/profile-placeholder.svg"
              }
              alt="profile picture"
              className="h-20 w-20 rounded-full"
            />
          </Link>
          <p className="h3-bold">{followedUser.followed.name}</p>
        </div>
      ))}
    </div>
  );
};

export default GridFollowedUserList;
