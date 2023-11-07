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
    { type: "text", label: "Name", value: name, setter: setName },
    { type: "text", label: "EMail", value: email, setter: setEmail },
    {
      type: "password",
      label: "Password",
      value: password,
      setter: setPassword,
    },
    {
      type: "password",
      label: "Password(確認)",
      value: passwordConfirmation,
      setter: setPasswordConfirmation,
    },
    { type: "text", label: "Phone", value: phone, setter: setPhone },
    {
      type: "date",
      label: "birthdate",
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
      <form noValidate autoComplete="off">
        <Card>
          <CardHeader title="Sign Up" />
          <CardContent>
            {inputFields.map((field) => (
              <TextField
                key={field.label}
                required
                fullWidth
                type={field.type}
                label={field.label}
                value={field.value}
                margin="dense"
                InputLabelProps={{ shrink: true }}
                onChange={(event) => field.setter(event.target.value)}
              />
            ))}
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              onClick={handleSubmit}
            >
              Submit
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
