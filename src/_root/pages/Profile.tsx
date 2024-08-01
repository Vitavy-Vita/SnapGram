import GridPostList from "@/components/shared/GridPostList";
import GridSavedPostList from "@/components/shared/GridSavedPostsList";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserContext } from "@/context/AuthContext";
import {
  useGetPosts,
  useGetSavedPosts,
  useGetUserById,
} from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Link, useParams } from "react-router-dom";

const Profile = () => {
  const { ref, inView } = useInView();
  const { id } = useParams();
  const { user } = useUserContext();
  const { data: userId } = useGetUserById(id || "");
  const {
    data: posts,
    isPending: isPostLoading,
    hasNextPage,
    fetchNextPage,
  } = useGetPosts();
  const { data: savedPosts, isPending: isSavedLoading } = useGetSavedPosts();

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  if (!userId || !posts || !savedPosts) {
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
    <div className="user-container">
      <div className="max-w-5xl flex w-full gap-6 md:gap-9 ">
        <img
          src={userId.imageUrl}
          alt="profil picture"
          className="rounded-full w-24 h-24"
        />
        <div className="flex flex-col ">
          <h2 className="h2-bold">{userId.name}</h2>
          <p className="text-light-4">@{userId.username}</p>
          <p>{userId.bio}</p>
        </div>
        <Link to={`/update-profile/${id}`}>
          <Button className="gap-1">
            <img src="/assets/icons/edit.svg" alt="edit-icon" className="w-4" />
            <p className="medium-bold">Edit Profile</p>
          </Button>
        </Link>
      </div>
      <div className="user-inner_container mt-10">
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="gap-5">
            <TabsTrigger value="posts" className="medium-bold gap-1">
              <img src="/assets/icons/posts.svg" alt="posts" />
              Posts
            </TabsTrigger>
            {user.id === userId.$id && (
              <TabsTrigger value="savedPosts" className="medium-bold gap-1">
                <img src="/assets/icons/saved.svg" alt="saved" />
                Saved
              </TabsTrigger>
            )}
          </TabsList>
          <TabsContent value="posts">
            <div className="flex flex-wrap gap-9 w-full max-w-5xl">
              {isPostLoading && !posts ? (
                <Loader />
              ) : shouldShowPosts ? (
                <p className="text-light-4 mt-10 text-center w-full">
                  End of posts
                </p>
              ) : (
                posts.pages.map((item, index) => (
                  <GridPostList
                    key={`page-${index}`}
                    posts={item.documents.filter(
                      (post: Models.Document) => post.users.$id === userId.$id
                    )}
                  />
                ))
              )}
            </div>
          </TabsContent>
          <TabsContent value="savedPosts">
            <div className="flex flex-wrap gap-9 w-full max-w-5xl">
              {isSavedLoading && !savedPosts ? (
                <Loader />
              ) : shouldShowPosts ? (
                <p className="text-light-4 mt-10 text-center w-full">
                  End of posts
                </p>
              ) : (
                savedPosts.pages.map((item, index) => (
                  <GridSavedPostList
                    key={`page-${index}`}
                    savedPosts={item.documents.filter(
                      (post: Models.Document) => post.user.$id === userId.$id
                    )}
                  />
                ))
              )}
            </div>
          </TabsContent>
          {hasNextPage && (
            <div ref={ref} className="mt-10">
              <Loader />
            </div>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
