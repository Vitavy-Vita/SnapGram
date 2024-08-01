import UserForm from "@/components/forms/UserForm";
import Loader from "@/components/shared/Loader";
import { useGetUserById } from "@/lib/react-query/queriesAndMutations";
import { useParams } from "react-router-dom";

const UpdateProfile = () => {
    const {id} = useParams()
    const {data: user, isPending} = useGetUserById(id || '')
    if (isPending) return <Loader/>
    return (
        <div className="flex flex-1">
        <div className="common-container">
          <div className="max-w-5xl flex-start gap-3 justify-start w-full">
            <img
              src="/assets/icons/edit.svg"
              alt="add-post"
              width={36}
              height={36}
            />
            <h2 className="h3-bold md:h2-bold text-left w-full">Edit Profile</h2>
          </div>
          <UserForm userToUpdate={user} />
        </div>
      </div>
    );
};

export default UpdateProfile;