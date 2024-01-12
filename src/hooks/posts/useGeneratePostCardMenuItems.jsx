import React from "react";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { confirmingState, currentUserState } from "../../globalStates/atoms";
import { Button } from "@mui/material";

export const useGeneratePostCardMenuItems = (props) => {
  const { record, handleDelete } = props;
  const setConfirming = useSetRecoilState(confirmingState);
  const currentUser = useRecoilValue(currentUserState);

  const isLoggedInUser = record.user.id === currentUser.id;

  // ログインユーザのfolloweesに表示ユーザが含まれていたらフォローしている。明示的にBoolean型にキャストする。
  const isFollowing = !!currentUser.followees.find(
    (followee) => followee.id === record.user.id
  );

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

  const loggedInMenuItems = [
    {
      icon: <DeleteOutlineIcon />,
      title: "削除",
      fontColor: "red",
      onClick: () => setConfirming(confirming),
    },
  ];

  const followingMenuItems = [
    {
      icon: <PersonAddAltOutlinedIcon />,
      title: `@${record.user.user_name}をフォロー`,
      onClick: () => {},
    },
  ];

  const unFollowingMenuItems = [
    {
      icon: <PersonRemoveOutlinedIcon />,
      title: `@${record.user.user_name}のフォローを解除`,
      onClick: () => {},
    },
  ];

  const menuItems = isLoggedInUser
    ? loggedInMenuItems
    : isFollowing
    ? followingMenuItems
    : unFollowingMenuItems;

  return menuItems;
};
