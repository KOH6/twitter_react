import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

import { loadingState } from "../../globalStates/atoms";
import { fetchPost } from "../../apis/posts";
import { useNavigate, useParams } from "react-router-dom";

const inititalPost = {
  content: "",
  image_paths: [],
};

export const usePostFetch = () => {
  const [post, setPost] = useState(inititalPost);
  const { id } = useParams();

  const setLoading = useSetRecoilState(loadingState);
  const navigate = useNavigate();

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
      // TODO データがなかった場合、NotFoundページに遷移する
      console.log("err", err);
      navigate("/not_found");
    }
  };

  return {
    post,
  };
};
