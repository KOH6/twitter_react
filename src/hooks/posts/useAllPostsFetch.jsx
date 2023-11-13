import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

import { loadingState } from "../../globalStates/atoms";
import { fetchPosts } from "../../apis/posts";

const LIMIT = 10;

const initialPostsData = {
  posts: [],
  prevOffset: 0,
  nextOffset: LIMIT,
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
    const fetchedData = data.data;

    if (fetchedData.length === LIMIT) {
      setPostsData((prev) => ({
        ...prev,
        posts: fetchedData,
        prevOffset: data.prevOffset,
        nextOffset: data.nextOffset,
      }));
    } else {
      // LIMITに満たない件数のデータが取得される=「次へ」で取得するデータが存在しないため、nextOffsetは更新しない。
      setPostsData((prev) => ({
        ...prev,
        posts: fetchedData,
        prevOffset: data.prevOffset,
      }));
    }
  };

  return {
    postsData,
    handleClickPrev,
    handleClickNext,
    fetchPagenatePosts,
  };
};
