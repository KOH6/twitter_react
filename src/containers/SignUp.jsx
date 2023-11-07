import React, { useState } from "react";

import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";

import { ToastMessage } from "../components/utils/ToastMessage";

import { signUp } from "../apis/signUp";

import { CONFIRM_SUCCESS_URL } from "../urls/index";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [phone, setPhone] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const [toastOpen, setToastOpen] = useState(false);
  const [toastProps, setToastProps] = useState({
    severity: "info",
    message: "",
  });

  const inputFields = [
    {
      type: "text",
      label: "ユーザ名",
      helperText: "",
      value: name,
      setter: setName,
    },
    {
      type: "text",
      label: "メールアドレス",
      helperText: "",
      value: email,
      setter: setEmail,
    },
    {
      type: "password",
      label: "パスワード",
      helperText: "6文字以上",
      value: password,
      setter: setPassword,
    },
    {
      type: "password",
      label: "パスワード(確認)",
      helperText: "",
      value: passwordConfirmation,
      setter: setPasswordConfirmation,
    },
    {
      type: "text",
      label: "電話番号",
      helperText: "",
      value: phone,
      setter: setPhone,
    },
    {
      type: "date",
      label: "生年月日",
      helperText: "",
      value: birthdate,
      setter: setBirthdate,
    },
  ];

  const signUpParams = {
    name: name,
    email: email,
    password: password,
    passwordConfirmation: passwordConfirmation,
    phone: phone,
    birthdate: birthdate,
    confirm_success_url: CONFIRM_SUCCESS_URL,
  };

  const isBlankSomeField = () => {
    return (
      name === "" ||
      email === "" ||
      password === "" ||
      passwordConfirmation === "" ||
      phone === "" ||
      birthdate === ""
    );
  };

  const openToast = (severity, message) => {
    setToastProps({
      severity: severity,
      message: message,
    });
    setToastOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isBlankSomeField()) {
      openToast("info", "空欄の項目があります。");
      return;
    }

    try {
      const res = await signUp(signUpParams);
      console.log("res", res);

      if (res.status !== 200) {
        openToast("error", res.data.errors.full_messages.join("\r\n"));
      }
    } catch (err) {
      console.log("err", err);
      openToast("error", err.response.data.errors.full_messages.join("\r\n"));
    }
  };

  return (
    <>
      <form>
        <Card sx={{ width: "50%", margin: "3rem auto", textAlign: "center" }}>
          <CardHeader title="新規登録" />
          <CardContent>
            {inputFields.map((field) => (
              <TextField
                key={field.label}
                required
                fullWidth
                type={field.type}
                label={field.label}
                value={field.value}
                margin="normal"
                InputLabelProps={{ shrink: true }}
                helperText={field.helperText}
                onChange={(event) => field.setter(event.target.value)}
              />
            ))}
            <Button
              type="submit"
              variant="contained"
              size="large"
              // fullWidth
              margin="normal"
              onClick={handleSubmit}
            >
              登録
            </Button>
          </CardContent>
        </Card>
      </form>

      <ToastMessage
        open={toastOpen}
        setOpen={setToastOpen}
        severity={toastProps.severity}
        message={toastProps.message}
      />
    </>
  );
};
