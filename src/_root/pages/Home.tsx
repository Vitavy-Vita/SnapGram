import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import { useGetRecentsInfinitePosts } from "@/lib/react-query/queriesAndMutations";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import RightSideBar from "@/components/shared/RightSideBar";

const Home = () => {
  const { ref, inView } = useInView();
  const {
    data: posts,
    isPending: isPostLoading,
    fetchNextPage,
    hasNextPage,
  } = useGetRecentsInfinitePosts();

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
  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            posts.pages.map((item, index) => (
              <PostCard posts={item.documents} key={index} />
            ))
          )}
        </div>
        {hasNextPage && (
          <div ref={ref} className="mt-10">
            <Loader />
          </div>
        )}
      </div>
      <RightSideBar/>
    </div>
  );
};

export default Home;
