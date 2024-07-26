import Loader from "@/components/shared/Loader";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useGetSavedPosts } from "@/lib/react-query/queriesAndMutations";
import GridSavedPostList from "@/components/shared/GridSavedPostsList";
import { useUserContext } from "@/context/AuthContext";
import { Models } from "appwrite";

const Saved = () => {
  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage } = useGetSavedPosts();
  const { user } = useUserContext();

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  if (!posts) {
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
    <div className="explore-container">
      <div className="explore-inner_container"></div>
      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold ">Saved Posts</h3>
      </div>
      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {shouldShowPosts ? (
          <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
        ) : (
          posts.pages.map((item, index) => (
            <GridSavedPostList
              key={`page-${index}`}
              posts={item.documents.filter(
                (post: Models.Document) => post.user.$id === user.id
              )}
            />
          ))
        )}
      </div>
      {hasNextPage && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Saved;
