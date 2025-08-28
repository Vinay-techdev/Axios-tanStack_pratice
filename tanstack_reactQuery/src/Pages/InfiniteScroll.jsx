import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "../API/api";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const InfiniteScroll = () => {
  const { data, hasNextPage, fetchNextPage, status, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["users"],
      queryFn: fetchUsers,
      getNextPageParam: (lastPage, allPages) => {
        console.log("lastPage", lastPage, allPages);
        return lastPage.length === 10 ? allPages.length + 1 : undefined;
      },
    });

  console.log(data);

  //   const handleScroll = () => {
  //     const bottom =
  //       window.innerHeight + window.scrollY >=
  //       document.documentElement.scrollHeight - 1;

  //     if (bottom && hasNextPage) {
  //       fetchNextPage();
  //     }
  //   };

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "error") return <div>Error fetching data</div>;

  return (
    <div>
      <h1 className="heading">Infinite Scroll Bar</h1>

      {data?.pages?.map((page, index) => (
        <ul key={index}>
          {page.map((user) => (
            <li
              key={user.id}
            >
              <div className="scrollContainer">
              <p className="title">{user.login}</p>
              <img
                className="image"
                src={user.avatar_url}
                alt={user.login}
                width={50}
                height={50}
              />
              </div>
            </li>
          ))}
        </ul>
      ))}
      <div ref={ref} style={{ padding: "20px", textAlign: "center" }}>
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Scroll down to load more"
          : "No more users"}
      </div>
    </div>
  );
};
