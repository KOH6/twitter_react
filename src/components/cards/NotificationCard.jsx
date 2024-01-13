import React from "react";

import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import { PostCardHeaderTitle } from "../PostCardHeaderTitle";
import { formatDateTime } from "../../lib/utility";
import { CommentCard } from "./CommentCard";

const FollowCard = (props) => {
  const { notification } = props;
  return <></>;
};

const PostShowingCard = (props) => {
  const { notification } = props;

  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container>
          <Grid item xs={1} sx={{ textAlign: "left" }}>
            <Avatar
              sx={{
                height: "4vh",
                width: "4vh",
              }}
              alt={`${notification.sender.name}`}
              src={`${notification.sender.profile_image_path}`}
            />
          </Grid>
          <Grid item xs={11}>
            <CardHeader
              sx={{ p: 1 }}
              title={
                <PostCardHeaderTitle
                  header={notification.sender.name}
                  subHeader={`@${
                    notification.sender.user_name
                  }・${formatDateTime(
                    new Date(notification.target.created_at)
                  )}`}
                />
              }
            />
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
