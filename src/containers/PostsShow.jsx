import React from "react";

import { PostDetail } from "../components/details/PostDetail";
import { usePostFetch } from "../hooks/posts/usePostFetch";
import { CommentCard } from "../components/cards/CommentCard";
import { Card } from "@mui/material";

export const PostsShow = () => {
  const { post } = usePostFetch();

  return (
    <>
      {post && (
        <Card
          variant="outlined"
          sx={{
            textAlign: "center",
            borderRight: "none",
            borderLeft: "none",
            borderRadius: "0%",
          }}
        >
          <PostDetail post={post} />
          {post.comments?.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </Card>
      )}
    </>
  );
};
