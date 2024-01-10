import React from "react";
import Cookies from "js-cookie";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

import {
  confirmingState,
  currentUserState,
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
import { createComment } from "../../apis/comments.js";

const HeaderTitle = (props) => {
  const { header, subHeader } = props;

  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      spacing={0}
    >
      <Typography
        variant="body1"
        sx={{ fontWeight: "bold", textAlign: "left" }}
      >
        {header}
      </Typography>
      <Typography variant="body1" sx={{ color: "grey", px: 1 }}>
        {subHeader}
      </Typography>
    </Stack>
  );
};

export const PostCard = (props) => {
  // 削除後の後処理はページごとに異なるので、propsで渡す
  const { post, afterDeletePost } = props;

  const currentUser = useRecoilValue(currentUserState);
  const setLoading = useSetRecoilState(loadingState);
  const setConfirming = useSetRecoilState(confirmingState);
  const navigate = useNavigate();

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
    {
      icon: <ChatBubbleOutlineIcon />,
      onClick: (e) => handleCreateComment(e),
    },
    {
      icon: <RepeatIcon />,
      onClick: (e) => handleCreateComment(e),
    },
    {
      icon: <FavoriteBorderIcon />,
      onClick: (e) => handleCreateComment(e),
    },
    {
      icon: <BookmarkBorderIcon />,
      onClick: (e) => handleCreateComment(e),
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
        sx={{ borderRadius: 50 }}
        onClick={async () => await handleDelete()}
      >
        削除
      </Button>
    ),
    disagree: (
      <Button
        variant="outlined"
        color="secondary"
        sx={{ borderRadius: 50, color: "black" }}
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
    } catch (err) {
      console.log("err", err);
    } finally {
      setLoading(false);
      setConfirming((prev) => ({ ...prev, isOpen: false }));
    }
  };

  const handleCreateComment = async (e) => {
    e.stopPropagation();

    try {
      setLoading(true);

      const headers = {
        "access-token": Cookies.get("_access_token"),
        client: Cookies.get("_client"),
        uid: Cookies.get("_uid"),
      };

      // TODO:入力内容を画面から受け取る
      const comment = {
        post_id: post.id,
        content: "form react",
      };

      // 本文を登録する
      const res = await createComment(comment, headers);
    } catch (err) {
      console.log("err", err);
    } finally {
      setLoading(false);
    }
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
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/${post.user.user_name}`);
                }}
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
                  <HeaderTitle
                    header={post.user.name}
                    subHeader={`@${post.user.user_name}・${formatDateTime(
                      new Date(post.created_at)
                    )}`}
                  />
                }
              />
              <Typography
                variant="body1"
                sx={{ px: 1, textAlign: "left" }}
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
                        zIndex: 10000,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "2rem",
                        width: "2rem",
                        "&:hover": {
                          background: "#E4E4E4",
                          borderRadius: "50%",
                          opacity: 0.99,
                        },
                      }}
                      onClick={item.onClick}
                    >
                      {item.icon}
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
