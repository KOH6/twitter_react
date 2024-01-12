import React, { useState } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { UserEditModal } from "../modals/UserEditModal";

export const UserDetail = (props) => {
  const { user, isLoggedInUser } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card variant="outlined" sx={{ border: "none" }}>
        <CardHeader
          title={`${user.name}`}
          titleTypographyProps={{ variant: "h5", fontWeight: "bold" }}
          subheader={`${user.tweets?.length}`.concat("件のポスト")}
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
              sx={{ height: "8vh", width: "8vh" }}
              alt={`${user.name}`}
              src={`${user.profile_image_path}`}
            />
          }
          action={
            isLoggedInUser && (
              <Button
                type="submit"
                variant="outlined"
                color="black"
                size="large"
                onClick={() => {
                  setOpen(true);
                }}
                sx={{
                  borderRadius: 50,
                  fontWeight: "bold",
                }}
              >
                プロフィールを編集
              </Button>
            )
          }
        />
        <CardContent>
          <Typography
            variant="h5"
            fontWeight="bold"
          >{`${user.name}`}</Typography>
          <Typography gutterBottom color="text.secondary">
            {"@".concat(`${user.user_name}`)}
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            {user.introduction}
          </Typography>
        </CardContent>
      </Card>
      {/* 編集モーダル */}
      <UserEditModal open={open} setOpen={setOpen}></UserEditModal>
    </>
  );
};
