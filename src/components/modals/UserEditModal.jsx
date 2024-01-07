import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import {
  Avatar,
  CardMedia,
  IconButton,
  Modal,
  Toolbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";

import {
  currentUserState,
  flashState,
  loadingState,
} from "../../globalStates/atoms.js";
import { updateUser } from "../../apis/users.js";

const userEditFields = [
  {
    label: "表示名",
    name: "name",
    type: "text",
    required: true,
    helperText: "投稿上に表示されるアカウント名（表示名）です。",
  },
  {
    label: "ユーザ名",
    name: "user_name",
    type: "text",
    required: true,
    helperText: "ユーザを固有に識別する名前です。",
  },
  {
    name: "birthdate",
    label: "生年月日",
    type: "date",
    required: true,
    helperText: "",
  },
  {
    name: "introduction",
    label: "自己紹介",
    type: "text",
    required: false,
    helperText: "",
    multiline: true,
    rows: 3,
  },
  {
    name: "place",
    label: "場所",
    type: "text",
    required: false,
    helperText: "",
  },
  {
    name: "website",
    label: "ウェブサイト",
    type: "text",
    required: false,
    helperText: "",
  },
];

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(grey[900]),
  backgroundColor: grey[900],
  "&:hover": {
    backgroundColor: grey[700],
  },
}));

export const UserEditModal = (props) => {
  const { open, setOpen } = props;

  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [user, setUser] = useState(currentUser);
  const [profileImage, setProfileImage] = useState(
    currentUser.profile_image_path
  );
  const [headerImage, setHeaderImage] = useState(currentUser.header_image_path);

  const setFlash = useSetRecoilState(flashState);
  const setLoading = useSetRecoilState(loadingState);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const headers = {
        "access-token": Cookies.get("_access_token"),
        client: Cookies.get("_client"),
        uid: Cookies.get("_uid"),
        "content-type": "multipart/form-data",
      };

      // プロフィールを更新する
      const formData = createFormData(user);
      console.log("formData", ...formData.entries());
      const res = await updateUser(formData, headers);

      setCurrentUser(res.data);
      handleClose();
    } catch (err) {
      console.log("err", err);
      setFlash({
        isOpen: true,
        severity: "error",
        message: err.response.data.errors.join("\r\n"),
      });
    } finally {
      setLoading(false);
    }
  };

  const createFormData = (user) => {
    const formData = new FormData();

    userEditFields.forEach(({ name }) => {
      formData.append(name, user[name]);
    });

    return formData;
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ width: "50%", margin: "5vh auto", textAlign: "center" }}
    >
      <form>
        <Card>
          {/* ヘッダー */}
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              sx={{ ml: 2, flex: 1, fontWeight: "bold", textAlign: "left" }}
              variant="h6"
              component="div"
            >
              プロフィールを編集する
            </Typography>
            <ColorButton
              variant="contained"
              onClick={handleSubmit}
              sx={{
                borderRadius: 50,
                fontWeight: "bold",
                color: "white",
              }}
            >
              保存
            </ColorButton>
          </Toolbar>
          {/* 背景画像 */}
          <div style={{ position: "relative" }}>
            <CardMedia
              component="img"
              sx={{ height: "10vh", margin: "0 auto" }}
              image={headerImage}
              alt="背景画像"
            />
            <IconButton
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                margin: "auto",
                height: "4vh",
                width: "4vh",
                background: "grey",
                "&:hover": {
                  background: "grey",
                  cursor: "pointer",
                  opacity: "0.8",
                },
              }}
            >
              <label htmlFor={user.header_image_path}>
                <AddAPhotoOutlinedIcon
                  color="secondary"
                  sx={{
                    textAlign: "center",
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                />
                <input
                  id={user.header_image_path}
                  type="file"
                  multiple
                  accept="image/*,.png,.jpg,.jpeg,.gif"
                  // onChange={(e) => handleAttachImage(e)}
                  style={{ display: "none" }}
                />
              </label>
            </IconButton>
          </div>
          {/* プロフィール画像 */}
          <Avatar
            sx={{ height: "12%", width: "12%", m: 1 }}
            alt={`${user.name}`}
            src={`${profileImage}`}
          />
          {/* テキスト項目 */}
          <CardContent>
            {userEditFields.map((field) => (
              <TextField
                key={field.label}
                required={field.required}
                fullWidth
                multiline={field.multiline}
                rows={field.rows}
                type={field.type}
                label={field.label}
                name={field.name}
                value={user[field.name]}
                margin="normal"
                InputLabelProps={{ shrink: true }}
                helperText={field.helperText}
                onChange={handleChange}
              />
            ))}
          </CardContent>
        </Card>
      </form>
    </Modal>
  );
};
