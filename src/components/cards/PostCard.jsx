import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

import { currentUserState, loadingState } from "../../globalStates/atoms.js";
import { deletePost } from "../../apis/posts.js";

import { formatDateTime } from "../../lib/utility.js";
import { ExpandableMenu } from "../utils/ExpandableMenu.jsx";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  Avatar,
  Box,
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
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deletePost(post.id);
      afterDeletePost();
    } catch (err) {
      console.log("err", err);
    } finally {
      setLoading(false);
    }
  };

  const defaultMenuItems = [];

  const deleteMenuItem = {
    icon: <DeleteOutlineIcon />,
    title: "削除",
    fontColor: "red",
    onClick: async () => await handleDelete(),
  };

  const createMenuItems = () => {
    const isLoggedInUser = post.user.user_name === currentUser.user_name;
    return isLoggedInUser
      ? [deleteMenuItem, ...defaultMenuItems]
      : defaultMenuItems;
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
                    menuItems={createMenuItems()}
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
              {post.image_paths.map((image_path, index) => (
                <img
                  key={`post-${post.id}-image-${index}`}
                  src={image_path}
                  style={{
                    width: "80%",
                    margin: "1rem auto",
                    borderRadius: "10px",
                  }}
                  alt=""
                />
              ))}
              <Box sx={{ mt: 2 }}>
                <Stack
                  spacing={{ xs: 1, sm: 2 }}
                  direction="row"
                  useFlexGap
                  flexWrap="wrap"
                  justifyContent="space-around"
                >
                  <ChatBubbleOutlineIcon />
                  <RepeatIcon />
                  <FavoriteBorderIcon />
                  <BookmarkBorderIcon />
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
