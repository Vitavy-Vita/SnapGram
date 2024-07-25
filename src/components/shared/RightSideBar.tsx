import { useGetAllUsers } from "@/lib/react-query/queriesAndMutations";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const RightSideBar = () => {
  const { data: users } = useGetAllUsers();

  return (
    <div className="rightsidebar">
      <h2 className="h3-bold md:h2-bold text-left w-full">Top Creators</h2>
      <div className="grid grid-cols-2 gap-20 md-10 my-10">
        {users &&
          users.documents.map((user, index) => (
            <div className="flex flex-col items-center gap-2" key={index}>
              <Link
                to={`/profile/${user.id}`}
                className="flex gap-3 items-center"
              >
                <img
                  src={
                    user.imageUrl || "/assets/images/profile-placeholder.svg"
                  }
                  alt="profile picture"
                  className="h-14 w-14 rounded-full"
                />
              </Link>
              <p className="body-bold">{user.name}</p>
              <p className="small-regular text-light-3">@{user.username}</p>
              <Button className="shad-button_primary">Follow</Button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RightSideBar;
