import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Cookies from "js-cookie";

import {
  Avatar,
  CardHeader,
  Grid,
  IconButton,
  Modal,
  Toolbar,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

import {
  currentUserState,
  flashState,
  loadingState,
} from "../../globalStates/atoms.js";
import { createComment } from "../../apis/comments.js";
import { formatDateTime } from "../../lib/utility.js";
import { PostCardHeaderTitle } from "../PostCardHeaderTitle.jsx";

const inititalComment = {
  content: "",
};

const MAX_LENGTH = 140;

export const CommentCreateModal = (props) => {
  const { post, open, setOpen } = props;
  const [comment, setComment] = useState(inititalComment);
  const currentUser = useRecoilValue(currentUserState);
  const setLoading = useSetRecoilState(loadingState);
  const setFlash = useSetRecoilState(flashState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComment((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateComment = async (e) => {
    e.preventDefault();

    if (comment.content.length >= MAX_LENGTH) {
      setFlash({
        isOpen: true,
        severity: "error",
        message: "コメントは140文字以内で入力してください。",
      });
      return;
    }
    try {
      setLoading(true);

      const headers = {
        "access-token": Cookies.get("_access_token"),
        client: Cookies.get("_client"),
        uid: Cookies.get("_uid"),
      };

      const requestComment = {
        post_id: post.id,
        content: comment.content,
      };
      await createComment(requestComment, headers);

      setOpen(false);
      setComment(inititalComment);

      setFlash({
        isOpen: true,
        severity: "success",
        message: "コメントしました",
      });
    } catch (err) {
      console.log("err", err);
      setFlash({
        isOpen: true,
        severity: "error",
        message: err.response.data.errors,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      sx={{ width: "50%", margin: "5vh auto", textAlign: "center" }}
    >
      <form>
        <Card>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpen(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
          {/* コメント先の投稿 */}
          <CardContent>
            <Grid container>
              <Grid item xs={1} sx={{ textAlign: "left" }}>
                <Avatar
                  sx={{
                    height: "4vh",
                    width: "4vh",
                  }}
                  alt={`${post.user.name}`}
                  src={`${post.user.profile_image_path}`}
                />
              </Grid>
              <Grid item xs={11}>
                <CardHeader
                  sx={{ p: 1 }}
                  title={
                    <PostCardHeaderTitle
                      header={post.user.name}
                      subHeader={`@${post.user.user_name}・${formatDateTime(
                        new Date(post.created_at)
                      )}`}
                    />
                  }
                />
                <Typography
                  variant="body1"
                  sx={{ px: 1, textAlign: "left", whiteSpace: "pre-line" }}
                  gutterBottom
                >
                  {post.content}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          {/* コメント投稿欄 */}
          <CardContent>
            <Grid container>
              <Grid item xs={1} sx={{ textAlign: "left" }}>
                <Avatar
                  sx={{ height: "4vh", width: "4vh" }}
                  alt={`${post.user.name}`}
                  src={`${currentUser.profile_image_path}`}
                />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  required
                  fullWidth
                  multiline
                  rows={4}
                  name="content"
                  value={comment.content}
                  InputLabelProps={{ shrink: true }}
                  placeholder="コメントを追加"
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12} sx={{ textAlign: "right" }}>
                <Button
                  type="submit"
                  disabled={comment.content.length === 0}
                  variant="contained"
                  size="large"
                  sx={{ borderRadius: 50, fontWeight: "bold" }}
                  onClick={(e) => handleCreateComment(e)}
                >
                  コメントする
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </form>
    </Modal>
  );
};
