import React from "react";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { ExpandableMenu } from "../utils/ExpandableMenu";
import { PostCardHeaderTitle } from "../PostCardHeaderTitle";

import {
  confirmingState,
  flashState,
  loadingState,
} from "../../globalStates/atoms";
import { formatDateTime } from "../../lib/utility";
import { deleteComment } from "../../apis/comments";
import { useGeneratePostCardMenuItems } from "../../hooks/posts/useGeneratePostCardMenuItems";

export const CommentCard = (props) => {
  const { comment, afterDeleteComment } = props;
  const setLoading = useSetRecoilState(loadingState);
  const setConfirming = useSetRecoilState(confirmingState);
  const setFlash = useSetRecoilState(flashState);

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteComment(comment.id);
      await afterDeleteComment();

      setFlash({
        isOpen: true,
        severity: "success",
        message: "コメントを削除しました",
      });
    } catch (err) {
      console.log("err", err);
    } finally {
      setLoading(false);
      setConfirming((prev) => ({ ...prev, isOpen: false }));
    }
  };

  const menuItems = useGeneratePostCardMenuItems({
    record: comment,
    handleDelete: handleDelete,
  });

  const handleClickUser = (e) => {
    e.stopPropagation();
    navigate(`/${comment.user.user_name}`);
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
              sx={{ zIndex: 10000 }}
              disableSpacing
              onClick={handleClickUser}
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
                  menuItems={menuItems}
                />
              }
              title={
                <PostCardHeaderTitle
                  header={comment.user.name}
                  subHeader={`@${comment.user.user_name}・${formatDateTime(
                    new Date(comment.created_at)
                  )}`}
                  canClick
                  onClick={handleClickUser}
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
