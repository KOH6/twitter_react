import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import Cookies from "js-cookie";

import { Avatar, Grid, IconButton, Modal, Toolbar } from "@mui/material";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

import { flashState, loadingState } from "../../globalStates/atoms.js";
import { createComment } from "../../apis/comments.js";

const inititalComment = {
  content: "",
};

const MAX_LENGTH = 140;

export const CommentCreateModal = (props) => {
  const { post, open, setOpen } = props;
  const [comment, setComment] = useState(inititalComment);
  const setLoading = useSetRecoilState(loadingState);
  const setFlash = useSetRecoilState(flashState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComment((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateComment = async (e) => {
    e.preventDefault();

    if (!comment.content) {
      setFlash({
        isOpen: true,
        severity: "info",
        message: "本文が未入力です",
      });
      return;
    }

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
          <CardContent>
            <Grid container>
              <Grid item xs={1} sx={{ textAlign: "left" }}>
                <Avatar
                  sx={{
                    height: "4vh",
                    width: "4vh",
                    "&:hover": {
                      cursor: "pointer",
                      opacity: "0.8",
                    },
                  }}
                  alt={`${post.user.name}`}
                  src={`${post.user.profile_image_path}`}
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
                  placeholder="別のポストを追加"
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
