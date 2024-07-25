import { Button } from "@/components/ui/button";
import { useGetAllUsers } from "@/lib/react-query/queriesAndMutations";
import { Link } from "react-router-dom";

const AllUsers = () => {
  const { data: users } = useGetAllUsers();
  return (
    <div className="user-container">
      <div className="user-inner_container">
        <h2 className="h3-bold md:h2-bold w-full flex gap-2">
          <img src="/assets/icons/people.svg" alt="people" />
          All Users
        </h2>
        <div className="user-grid">
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
                    className="h-20 w-20 rounded-full"
                  />
                </Link>
                <p className="h3-bold">{user.name}</p>
                <p className="medium-regular text-light-3">@{user.username}</p>
                <Button className="shad-button_primary mt-2">Follow</Button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
