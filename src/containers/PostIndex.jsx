import React from "react";
import { PostForm } from "../components/forms/PostForm";
import { usePostCreate } from "../hooks/posts/usePostCreate";
import { PostDetail } from "../components/cards/PostDetail";
import { useAllPostsFetch } from "../hooks/posts/useAllPostsFetch";

export const PostIndex = () => {
  const {
    post: newPost,
    images,
    setImages,
    handleChange,
    handleSubmit,
  } = usePostCreate();

  const { posts } = useAllPostsFetch();

  return (
    <>
      <PostForm
        post={newPost}
        images={images}
        setImages={setImages}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      {posts.map((post, index) => (
        <PostDetail key={post.id} post={post}></PostDetail>
      ))}
    </>
  );
};
