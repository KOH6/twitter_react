import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

import { flashState, loadingState } from "../../globalStates/atoms";
import { createPost, attachImages, fetchAllPosts } from "../../apis/posts";

export const useAllPostsFetch = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await fetchAllPosts();
      setPosts(data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    posts,
  };
};
