import React from "react";

import { PostCard } from "../cards/PostCard";

export const PostDetail = (props) => {
  const { post } = props;

  const afterDeletePost = () => console.log("afterDeletePost");
  const afterCreateComment = () => console.log("afterDeletePost");

  return (
    <PostCard
      key={post.id}
      post={post}
      afterDeletePost={() => afterDeletePost()}
      afterCreateComment={() => afterCreateComment()}
    />
  );
};
