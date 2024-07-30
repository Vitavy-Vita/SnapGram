import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";

import {
  useGetPosts,
  useGetUserById,
} from "@/lib/react-query/queriesAndMutations";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const { data: user } = useGetUserById(id || "");
  const { data: posts, isPending: isPostLoading } = useGetPosts();

  if (!user || (user === undefined && !posts) || posts === undefined) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }
  const shouldShowPosts = posts.pages.every(
    (item) => item.documents.length === 0
  );
  return (
    <div className="py-10 px-5 md:p-14">
      <div className="max-w-5xl flex w-full gap-6 md:gap-9 ">
        <img
          src={user.imageUrl}
          alt="profil picture"
          className="rounded-full w-24 h-24"
        />
        <div className="flex flex-col ">
          <h2 className="h2-bold">{user.name}</h2>
          <p className="text-light-4">@{user.username}</p>
          <p>{user.bio}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {isPostLoading && !posts ? (
          <Loader />
        ) : shouldShowPosts ? (
          <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
        ) : (
          posts.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={item.documents} />
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;
