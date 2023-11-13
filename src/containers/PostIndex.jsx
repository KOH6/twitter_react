import React from "react";
import { PostForm } from "../components/forms/PostForm";
import { usePostCreate } from "../hooks/posts/usePostCreate";
import { PostDetail } from "../components/cards/PostDetail";
import { useAllPostsFetch } from "../hooks/posts/useAllPostsFetch";
import { Button, Stack } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

export const PostIndex = () => {
  const {
    post: newPost,
    images,
    setImages,
    handleChange,
    handleSubmit,
  } = usePostCreate();

  const { posts, handleClickPrev, handleClickNext } = useAllPostsFetch();

  return (
    <>
      <PostForm
        post={newPost}
        images={images}
        setImages={setImages}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <Stack
        spacing={1}
        direction="row"
        useFlexGap
        flexWrap="wrap"
        justifyContent="center"
        sx={{ margin: "1rem auto" }}
      >
        <Button
          variant="outlined"
          startIcon={<NavigateBeforeIcon />}
          onClick={handleClickPrev}
        >
          前へ
        </Button>
        <Button
          variant="outlined"
          endIcon={<NavigateNextIcon />}
          onClick={handleClickNext}
        >
          次へ
        </Button>
      </Stack>
      {posts.map((post) => (
        <PostDetail key={post.id} post={post}></PostDetail>
      ))}
    </>
  );
};
