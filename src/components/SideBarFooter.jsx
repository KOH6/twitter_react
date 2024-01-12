import React from "react";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardHeader,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { ExpandableMenu } from "./utils/ExpandableMenu";

import { confirmingState } from "../globalStates/atoms";

export const SideBarFooter = (props) => {
  const { user, handleLogout } = props;
  const setConfirming = useSetRecoilState(confirmingState);

  const navigate = useNavigate();

  const menuItems = [
    {
      icon: null,
      title: `@${user.user_name}からログアウト`,
      onClick: () => setConfirming(confirming),
    },
  ];

  /**
   * 確認ダイアログ上の情報
   */
  const confirming = {
    isOpen: true,
    title: "Xからログアウトしますか？",
    message: "いつでもログインし直すことができます。",
    agree: (
      <Button
        variant="contained"
        color="black"
        onClick={(prev) => {
          handleLogout();
          setConfirming({ ...prev, isOpen: false });
        }}
        sx={{ borderRadius: 50, fontWeight: "bold" }}
      >
        ログアウト
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

  return (
    <Card
      variant="outlined"
      sx={{
        width: "100%",
        border: "none",
        margin: "0 auto",
      }}
    >
      <CardActionArea
        onClick={(e) => {
          navigate(`/${user.user_name}`);
        }}
      >
        <CardHeader
          sx={{ p: 1 }}
          avatar={
            <CardActions
              sx={{
                zIndex: 10000,
              }}
              disableSpacing
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/${user.user_name}`);
              }}
            >
              <Avatar
                sx={{
                  height: "40px",
                  width: "40px",
                  p: 0,
                  "&:hover": {
                    cursor: "pointer",
                    opacity: "0.8",
                  },
                }}
                alt={`${user.name}`}
                src={`${user.profile_image_path}`}
              />
            </CardActions>
          }
          action={
            <ExpandableMenu
              displayIcon={<MoreHorizIcon />}
              menuItems={menuItems}
            />
          }
          title={`${user.name}`}
          titleTypographyProps={{
            variant: "body1",
            fontWeight: "bold",
            px: 1,
          }}
          subheader={"@".concat(`${user.user_name}`)}
          subheaderTypographyProps={{ px: 1 }}
        />
      </CardActionArea>
    </Card>
  );
};
