import React from "react";

import { PostDetail } from "../components/details/PostDetail";
import { usePostFetch } from "../hooks/posts/usePostFetch";

export const PostsShow = () => {
  const { post } = usePostFetch();

  return (
    <>
      <PostDetail post={post}></PostDetail>
    </>
  );
};
