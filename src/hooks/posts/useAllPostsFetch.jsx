import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

import { loadingState } from "../../globalStates/atoms";
import { fetchPosts } from "../../apis/posts";
const LIMIT = 10;
const initialPostsData = {
  posts: [],
  prevOffset: 0,
  nextOffset: 0,
};

export const useAllPostsFetch = () => {
  const [postsData, setPostsData] = useState(initialPostsData);

  const setLoading = useSetRecoilState(loadingState);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchPagenatePosts(0);
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickPrev = () => {
    (async () => {
      setLoading(true);
      await fetchPagenatePosts(postsData.prevOffset);
      setLoading(false);
    })();
  };

  const handleClickNext = () => {
    (async () => {
      setLoading(true);
      await fetchPagenatePosts(postsData.nextOffset);
      setLoading(false);
    })();
  };

  const fetchPagenatePosts = async (offset) => {
    const { data } = await fetchPosts(LIMIT, offset);
    console.log("data", data);

    const fetchedData = data.data;
    if (fetchedData.length === LIMIT) {
      setPostsData((prev) => ({
        ...prev,
        posts: fetchedData,
        prevOffset: data.prevOffset,
        nextOffset: data.nextOffset,
      }));
    } else {
      setPostsData((prev) => ({ ...prev, posts: fetchedData }));
    }
  };

  return {
    postsData,
    handleClickPrev,
    handleClickNext,
    fetchPagenatePosts,
  };
};
