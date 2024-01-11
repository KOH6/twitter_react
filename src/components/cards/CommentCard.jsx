import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

import { ExpandableMenu } from "../utils/ExpandableMenu";
import { PostCardHeaderTitle } from "../PostCardHeaderTitle";

import {
  confirmingState,
  currentUserState,
  loadingState,
} from "../../globalStates/atoms";
import { formatDateTime } from "../../lib/utility";
import { deleteComment } from "../../apis/comments";

export const CommentCard = (props) => {
  const { comment, afterDeleteComment } = props;
  const currentUser = useRecoilValue(currentUserState);
  const setLoading = useSetRecoilState(loadingState);
  const setConfirming = useSetRecoilState(confirmingState);

  const navigate = useNavigate();

  const LoggedInMenuItems = [
    {
      icon: <DeleteOutlineIcon />,
      title: "コメント削除",
      fontColor: "red",
      onClick: () => setConfirming(confirming),
    },
  ];

  // TODO フォロー済みかいなかでの分岐
  const UnLoggedInMenuItems = [
    {
      icon: <PersonAddAltIcon />,
      title: `@${comment.user.user_name}をフォロー`,
      onClick: () => {},
    },
  ];

  /**
   * 確認ダイアログ上の情報
   */
  const confirming = {
    isOpen: true,
    title: "コメントを削除しますか？",
    message:
      "この操作は取り消せません。プロフィール、あなたをフォローしているアカウントのタイムラインからコメントが削除されます。 ",
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
      await deleteComment(comment.id);
      await afterDeleteComment();
    } catch (err) {
      console.log("err", err);
    } finally {
      setLoading(false);
      setConfirming((prev) => ({ ...prev, isOpen: false }));
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
                navigate(`/${comment.user.user_name}`);
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
                alt={`${comment.user.name}`}
                src={`${comment.user.profile_image_path}`}
              />
            </CardActions>
          </Grid>
          <Grid item xs={11}>
            <CardHeader
              sx={{ p: 1 }}
              action={
                <ExpandableMenu
                  displayIcon={<MoreHorizIcon />}
                  menuItems={
                    comment.user.user_name === currentUser.user_name
                      ? LoggedInMenuItems
                      : UnLoggedInMenuItems
                  }
                />
              }
              title={
                <PostCardHeaderTitle
                  header={comment.user.name}
                  subHeader={`@${comment.user.user_name}・${formatDateTime(
                    new Date(comment.created_at)
                  )}`}
                />
              }
            />
            <Typography
              variant="body1"
              sx={{ px: 1, textAlign: "left", whiteSpace: "pre-line" }}
              gutterBottom
            >
              {comment.content}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
