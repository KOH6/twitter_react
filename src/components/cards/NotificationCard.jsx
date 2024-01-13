import React from "react";

import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";

import { CommentCard } from "./CommentCard";
import { useNavigate } from "react-router-dom";

const FollowCard = (props) => {
  const { notification } = props;
  return <></>;
};

const PostShowingCard = (props) => {
  const { notification } = props;
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
      <CardContent>
        <Grid container>
          <Grid item xs={1} sx={{ textAlign: "left" }}>
            <FavoriteIcon
              sx={{
                color: "#F91780",
                height: "4vh",
                width: "4vh",
                ml: 1,
                mt: 1,
              }}
            />
          </Grid>
          <Grid item xs={11}>
            <CardHeader
              sx={{ p: 1 }}
              avatar={
                <CardActions
                  sx={{
                    zIndex: (theme) => theme.zIndex.appBar + 1,
                    p: 0,
                    m: 0,
                  }}
                  disableSpacing
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/${notification.sender.user_name}`);
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
                    alt={`${notification.sender.name}`}
                    src={`${notification.sender.profile_image_path}`}
                  />
                </CardActions>
              }
            />
            <Typography
              variant="body1"
              sx={{
                px: 1,
                textAlign: "left",
                whiteSpace: "pre-line",
              }}
              gutterBottom
            >
              <strong
                style={{
                  fontWeight: "bold",
                  paddingRight: "0.5rem",
                  color: "black",
                }}
              >
                {notification.sender.name}
              </strong>
              さんがあなたのポストにいいねしました
            </Typography>
            <Typography
              variant="body1"
              sx={{ px: 1, textAlign: "left", whiteSpace: "pre-line" }}
              gutterBottom
            >
              {notification.target.content}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export const NotificationCard = (props) => {
  const { notification } = props;

  const actionType = notification.action_type;

  const cardMap = {
    Follow: <FollowCard notification={notification} />,
    Like: <PostShowingCard notification={notification} />,
    Comment: <CommentCard comment={notification.target} />,
  };

  return cardMap[actionType];
};
