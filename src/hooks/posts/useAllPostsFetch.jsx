import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

import { flashState, loadingState } from "../../globalStates/atoms";
import { fetchPosts } from "../../apis/posts";

const LIMIT = 10;

export const useAllPostsFetch = () => {
  const [posts, setPosts] = useState([]);
  const [prevOffset, setPrevOffset] = useState(0);
  const [nextOffset, setNextOffset] = useState(0);

  const setLoading = useSetRecoilState(loadingState);

  useEffect(() => {
    (async () => await pagenatePosts(0))();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickPrev = () => {
    (async () => await pagenatePosts(prevOffset))();
  };

  const handleClickNext = () => {
    (async () => await pagenatePosts(nextOffset))();
  };

  const pagenatePosts = async (offset) => {
    setLoading(true);
    const { data } = await fetchPosts(LIMIT, offset);
    console.log("data", data);

    const fetchedData = data.data;
    setPosts(fetchedData);
    if (fetchedData.length === LIMIT) {
      setPrevOffset(data.prevOffset);
      setNextOffset(data.nextOffset);
    }
    setLoading(false);
  };

  return {
    posts,
    handleClickPrev,
    handleClickNext,
  };
};
