import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export const UserDetail = (props) => {
  const { user } = props;
  console.log("user", user);

  return (
    <Card variant="outlined" sx={{ border: "none" }}>
      <CardHeader
        title={`${user.name}`}
        titleTypographyProps={{ variant: "h5" }}
        subheader={`${user.tweets?.length}` + "件のポスト"}
      />
      <CardMedia
        component="img"
        height="10"
        sx={{ height: "30vh", margin: "0 auto" }}
        image={user.header_image_path}
        alt="背景画像"
      />
      <CardHeader
        avatar={
          <Avatar
            sx={{ height: "10vh", width: "10vh" }}
            alt={`${user.name}`}
            src={`${user.profile_image_path}`}
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
      />
      <CardContent>
        <Typography variant="h5">{`${user.name}`}</Typography>
        <Typography gutterBottom color="text.secondary">
          {"@".concat(`${user.user_name}`)}
        </Typography>
        <Typography variant="body1">{user.introduction}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
