import React from "react";
import { PostForm } from "../components/forms/PostForm";
import { usePostCreate } from "../hooks/posts/usePostCreate";
import { PostCard } from "../components/cards/PostCard";
import { useAllPostsFetch } from "../hooks/posts/useAllPostsFetch";
import { Button, Stack } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../globalStates/atoms";

export const PostsIndex = () => {
  const { postsData, fetchPagenatePosts, handleClickPrev, handleClickNext } =
    useAllPostsFetch();
  const posts = postsData.posts;
  const currentUser = useRecoilValue(currentUserState);

  const { post, images, setImages, handleChange, handleSubmit } = usePostCreate(
    { fetchPagenatePosts }
  );

  return (
    <>
      <PostForm
        user={currentUser}
        post={post}
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
        <PostCard key={post.id} post={post}></PostCard>
      ))}
    </>
  );
};
