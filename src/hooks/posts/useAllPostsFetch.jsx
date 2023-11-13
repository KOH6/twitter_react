import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

import { flashState, loadingState } from "../../globalStates/atoms";
import { fetchPosts } from "../../apis/posts";

const LIMIT = 10;

const initialPostsData = {
  posts: [],
  prevOffset: 0,
  nextOffset: 0,
};

export const useAllPostsFetch = () => {
  const [postsData, setPostsData] = useState(initialPostsData);
  const posts = postsData.posts;

  const setLoading = useSetRecoilState(loadingState);

  useEffect(() => {
    (async () => await pagenatePosts(0))();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickPrev = () => {
    (async () => await pagenatePosts(postsData.prevOffset))();
  };

  const handleClickNext = () => {
    (async () => await pagenatePosts(postsData.nextOffset))();
  };

  const pagenatePosts = async (offset) => {
    setLoading(true);
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
    setLoading(false);
  };

  return {
    posts,
    handleClickPrev,
    handleClickNext,
  };
};
