import React from "react";
import { PostForm } from "../components/forms/PostForm";
import { usePostCreate } from "../hooks/posts/usePostCreate";

export const PostIndex = () => {
  const { post, images, setImages, onChange, handleSubmit } = usePostCreate();

  return (
    <>
      <div>ツイート一覧画面</div>
      <PostForm
        post={post}
        images={images}
        setImages={setImages}
        handleChange={onChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
};
