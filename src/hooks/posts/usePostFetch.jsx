import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

import { loadingState } from "../../globalStates/atoms";
import { fetchPost } from "../../apis/posts";
import { useParams } from "react-router-dom";

const inititalPost = {
  content: "",
  image_paths: [],
};

export const usePostFetch = () => {
  const [post, setPost] = useState(inititalPost);
  const { id } = useParams();

  const setLoading = useSetRecoilState(loadingState);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await initializeShowingPost(id);
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initializeShowingPost = async (id) => {
    try {
      const res = await fetchPost(id);
      setPost(res.data);
    } catch (err) {
      // TODO データがなかった時のエラーハンドリング
      // NotFoundページに遷移する
      console.log("err", err);
    }
  };

  return {
    post,
  };
};
