import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

import { flashState, loadingState } from "../../globalStates/atoms";
import { createPost, attachImages } from "../../apis/posts";

export const usePostCreate = () => {
  const inititalPost = {
    content: "",
    // images: [],
  };
  const [post, setPost] = useState(inititalPost);

  const navigate = useNavigate();
  const setFlash = useSetRecoilState(flashState);
  const setLoading = useSetRecoilState(loadingState);

  const onChange = (e) => {
    // 画像対応必要かも
    const { name, value } = e.target;
    setPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!post.content) {
      setFlash({
        isOpen: true,
        severity: "info",
        message: "本文が未入力です",
      });
    }

    try {
      setLoading(true);

      const headers = {
        "access-token": Cookies.get("_access_token"),
        client: Cookies.get("_client"),
        uid: Cookies.get("_uid"),
      };

      // 本文の登録
      const postResponse = await createPost({ post: post }, headers);
      // 画像の登録
      const imageResponre = await attachImages({ post: post }, headers);

      navigate("/home");

      setFlash({
        isOpen: true,
        severity: "success",
        message: "ポストしました",
      });
    } catch (err) {
      console.log("err", err);
      setFlash({
        isOpen: true,
        severity: "error",
        message: err.response.data.errors,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    post,
    onChange,
    handleSubmit,
  };
};
