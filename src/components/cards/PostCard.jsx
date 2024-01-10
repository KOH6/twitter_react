import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  Avatar,
  Box,
  CardActionArea,
  CardActions,
  CardHeader,
  Grid,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { formatDateTime } from "../../lib/utility.js";
import { ExpandableMenu } from "../utils/ExpandableMenu.jsx";

const menuItems = [
  {
    icon: <Avatar sx={{ fontSize: 40 }} />,
    title: "プロフィール",
    onClick: () => {
      console.log("click");
    },
  },
];

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
  const { post } = props;
  const navigate = useNavigate();

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
                  textAlign: "left",
                  display: "flex",
                  flexDirection: "row",
                }}
                direction="row"
                action={
                  <ExpandableMenu
                    displayIcon={<MoreHorizIcon />}
                    menuItems={menuItems}
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
                sx={{ px: 3, textAlign: "left" }}
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
