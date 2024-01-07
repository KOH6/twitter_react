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
import { IconButton, Modal, Toolbar, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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
  const [profileImage, setProfileImage] = useState([]);
  const [headerImage, setHeaderImage] = useState([]);

  console.log("user", user);

  const navigate = useNavigate();
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
      const res = await updateUser(user, headers);

      setCurrentUser(res.data);
      handleClose();
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

  const createFormData = (user) => {
    const formData = new FormData();

    return formData;
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ width: "50%", margin: "15vh auto", textAlign: "center" }}
    >
      <form>
        <Card>
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
