import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

import {
  confirmingState,
  currentUserState,
  flashState,
  loadingState,
} from "../../globalStates/atoms.js";
import { deletePost } from "../../apis/posts.js";

import { formatDateTime } from "../../lib/utility.js";
import { ExpandableMenu } from "../utils/ExpandableMenu.jsx";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  Avatar,
  Box,
  Button,
  CardActionArea,
  CardActions,
  CardHeader,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

import { CommentCreateModal } from "../modals/CommentCreateModal.jsx";
import { PostCardHeaderTitle } from "../PostCardHeaderTitle.jsx";
import { createRepost, deleteRepost } from "../../apis/reposts.js";
import { createLike, deleteLike } from "../../apis/likes.js";
import { fetchUser } from "../../apis/users.js";

export const PostCard = (props) => {
  // 削除後の後処理はページごとに異なるので、propsで渡す
  const { post, afterDeletePost, afterCreateComment, reFetch } = props;
  const [open, setOpen] = useState(false);

  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const setLoading = useSetRecoilState(loadingState);
  const setConfirming = useSetRecoilState(confirmingState);
  const setFlash = useSetRecoilState(flashState);

  const navigate = useNavigate();

  const alreadyReposted =
    currentUser.retweets.filter((item) => item.id === post.id).length !== 0;
  const alreadyLiked =
    currentUser.likes.filter((item) => item.id === post.id).length !== 0;

  const LoggedInMenuItems = [
    {
      icon: <DeleteOutlineIcon />,
      title: "削除",
      fontColor: "red",
      onClick: () => setConfirming(confirming),
    },
  ];

  // TODO フォロー済みかいなかでの分岐
  const UnLoggedInMenuItems = [
    {
      icon: <PersonAddAltIcon />,
      title: `@${post.user.user_name}をフォロー`,
      onClick: () => {},
    },
  ];

  const footerItems = [
    // コメント
    {
      color: "#1E9BF0",
      background: "#E7EFF8",
      icon: (
        <>
          <ChatBubbleOutlineIcon />
          {post.comment_count !== 0 && (
            <Typography>{post.comment_count}</Typography>
          )}
        </>
      ),
      onClick: (e) => {
        e.stopPropagation();
        setOpen(true);
      },
    },
    // リツイート
    {
      color: "#00BA7C",
      background: "#E7F2EC",
      alreadyDone: alreadyReposted,
      icon: (
        <>
          <RepeatIcon />
          {post.retweet_count !== 0 && (
            <Typography>{post.retweet_count}</Typography>
          )}
        </>
      ),
      onClick: async (e) => {
        e.stopPropagation();
        await handleClickIcon(alreadyReposted, createRepost, deleteRepost);
      },
    },
    // いいね
    {
      color: "#F91780",
      background: "#FAE6ED",
      alreadyDone: alreadyLiked,
      icon: (
        <>
          <FavoriteBorderIcon />
          {post.like_count !== 0 && <Typography>{post.like_count}</Typography>}
        </>
      ),
      onClick: async (e) => {
        e.stopPropagation();
        await handleClickIcon(alreadyLiked, createLike, deleteLike);
      },
    },
    {
      icon: <BookmarkBorderIcon />,
      onClick: () => {},
    },
  ];

  /**
   * 確認ダイアログ上の情報
   */
  const confirming = {
    isOpen: true,
    title: "投稿を削除しますか？",
    message:
      "この操作は取り消せません。プロフィール、あなたをフォローしているアカウントのタイムラインから投稿が削除されます。 ",
    agree: (
      <Button
        variant="contained"
        color="error"
        onClick={async () => await handleDelete()}
        sx={{ borderRadius: 50, fontWeight: "bold" }}
      >
        削除
      </Button>
    ),
    disagree: (
      <Button
        variant="outlined"
        color="black"
        sx={{ borderRadius: 50, fontWeight: "bold" }}
        onClick={() => setConfirming((prev) => ({ ...prev, isOpen: false }))}
      >
        キャンセル
      </Button>
    ),
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deletePost(post.id);
      await afterDeletePost();

      setFlash({
        isOpen: true,
        severity: "success",
        message: "投稿を削除しました",
      });
    } catch (err) {
      console.log("err", err);
    } finally {
      setLoading(false);
      setConfirming((prev) => ({ ...prev, isOpen: false }));
    }
  };

  const handleClickIcon = async (alreadyDone, createRecord, deleteRecord) => {
    try {
      setLoading(true);

      if (alreadyDone) {
        await deleteRecord(post.id);
      } else {
        await createRecord(post.id);
      }

      await reFetch();
      const res = await fetchUser(currentUser.user_name);
      setCurrentUser(res.data);
    } catch (err) {
      console.log("err", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClickUser = (e) => {
    e.stopPropagation();
    navigate(`/${post.user.user_name}`);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        textAlign: "center",
        borderRight: "none",
        borderLeft: "none",
        borderRadius: "0%",
      }}
    >
      <CardActionArea
        onClick={() => {
          navigate(`/${post.user.user_name}/${post.id}`);
        }}
      >
        <CardContent>
          <Grid container>
            <Grid item xs={1} sx={{ textAlign: "left" }}>
              <CardActions
                sx={{
                  zIndex: 10000,
                }}
                disableSpacing
                onClick={handleClickUser}
              >
                <Avatar
                  sx={{
                    height: "4vh",
                    width: "4vh",
                    "&:hover": {
                      cursor: "pointer",
                      opacity: "0.8",
                    },
                  }}
                  alt={`${post.user.name}`}
                  src={`${post.user.profile_image_path}`}
                />
              </CardActions>
            </Grid>
            <Grid item xs={11}>
              <CardHeader
                sx={{
                  p: 1,
                }}
                action={
                  <ExpandableMenu
                    displayIcon={<MoreHorizIcon />}
                    menuItems={
                      post.user.user_name === currentUser.user_name
                        ? LoggedInMenuItems
                        : UnLoggedInMenuItems
                    }
                  />
                }
                title={
                  <PostCardHeaderTitle
                    header={post.user.name}
                    subHeader={`@${post.user.user_name}・${formatDateTime(
                      new Date(post.created_at)
                    )}`}
                    canClick
                    onClick={handleClickUser}
                  />
                }
              />
              <Typography
                variant="body1"
                sx={{ px: 1, textAlign: "left", whiteSpace: "pre-line" }}
                gutterBottom
              >
                {post.content}
              </Typography>
              <Grid container>
                {post.image_paths.map((image_path, index) => (
                  <Grid key={`post-${post.id}-image-${index}`} item xs={6}>
                    <img
                      src={image_path}
                      style={{
                        width: "80%",
                        margin: "1rem auto",
                        borderRadius: "10px",
                      }}
                      alt=""
                    />
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ mt: 2 }}>
                <Stack
                  spacing={{ xs: 1, sm: 2 }}
                  direction="row"
                  useFlexGap
                  flexWrap="wrap"
                  justifyContent="space-around"
                >
                  {footerItems.map((item, index) => (
                    <Box
                      key={`post-${post.id}-fotterItem-${index}`}
                      sx={{
                        zIndex: 100,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        "&:hover": {
                          background: item.background,
                          borderRadius: "50%",
                          opacity: 0.99,
                        },
                      }}
                      onClick={item.onClick}
                    >
                      <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={1}
                        color={item.alreadyDone && item.color}
                        sx={{
                          width: "4vh",
                          "&:hover": {
                            color: item.color,
                            transition: "0.2s",
                          },
                        }}
                      >
                        {item.icon}
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
      <CommentCreateModal
        post={post}
        open={open}
        setOpen={setOpen}
        afterCreateComment={afterCreateComment}
      />
    </Card>
  );
};
