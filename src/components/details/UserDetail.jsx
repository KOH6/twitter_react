import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { UserEditModal } from "../modals/UserEditModal";

import { currentUserState, loadingState } from "../../globalStates/atoms";
import { fetchUser } from "../../apis/users";
import { createFollow, deleteFollow } from "../../apis/follows.js";

const LoggedInButton = (props) => {
  return (
    <Button
      variant="outlined"
      color="black"
      size="large"
      onClick={props.onClick}
      sx={{
        borderRadius: 50,
        fontWeight: "bold",
      }}
    >
      プロフィールを編集
    </Button>
  );
};

const FollowingButton = (props) => {
  return (
    <Button
      variant="contained"
      color="black"
      size="large"
      onClick={props.onClick}
      sx={{
        borderRadius: 50,
        fontWeight: "bold",
      }}
    >
      フォロー
    </Button>
  );
};

const UnFollowingButton = (props) => {
  return (
    <Button
      variant="outlined"
      color="black"
      size="large"
      onClick={props.onClick}
      sx={{
        width: "10rem",
        borderRadius: 50,
        fontWeight: "bold",
        // ホバー時にボタンデザインを変更する
        "& .hoverText": {
          display: "none",
        },
        "&:hover": {
          background: "#FFEDEC",
          borderColor: "#FEC9CE",
          transition: "0s",
          "& .defaultText": { display: "none" },
          "& .hoverText": { display: "inline" },
        },
      }}
    >
      <p className="defaultText">フォロー中</p>
      <p className="hoverText" style={{ color: "#F4202E" }}>
        フォロー解除
      </p>
    </Button>
  );
};

export const UserDetail = (props) => {
  const { user, isLoggedInUser } = props;
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const setLoading = useSetRecoilState(loadingState);
  const [openEditModal, setOpenEditModal] = useState(false);

  // ログインユーザのfolloweesに表示ユーザが含まれていたらフォローしている。明示的にBoolean型にキャストする。
  const isFollowing = !!currentUser.followees.find(
    (followee) => followee.id === user.id
  );

  const handleClickFollowing = async () => {
    try {
      setLoading(true);

      await createFollow(user.user_name);

      const res = await fetchUser(currentUser.user_name);
      setCurrentUser(res.data);
    } catch (err) {
      console.log("err", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClickUnFollowing = async () => {
    try {
      setLoading(true);

      await deleteFollow(user.user_name);

      const res = await fetchUser(currentUser.user_name);
      setCurrentUser(res.data);
    } catch (err) {
      console.log("err", err);
    } finally {
      setLoading(false);
    }
  };

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
            isLoggedInUser ? (
              <LoggedInButton onClick={() => setOpenEditModal(true)} />
            ) : isFollowing ? (
              <UnFollowingButton onClick={() => handleClickUnFollowing()} />
            ) : (
              <FollowingButton onClick={() => handleClickFollowing()} />
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
      <UserEditModal
        open={openEditModal}
        setOpen={setOpenEditModal}
      ></UserEditModal>
    </>
  );
};
