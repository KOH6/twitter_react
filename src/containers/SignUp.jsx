import React, { useState } from "react";

import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";

import { ToastMessage } from "../components/utils/ToastMessage";

import { signUp } from "../apis/signUp";

const TEST_DATA = {
  email: "a@example.com",
  password: "Abcd1234",
  phone: "1234",
  birthdate: "1990-01-01",
  confirm_success_url: "http://google.com",
};

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const [toastProps, setToastProps] = useState({
    severity: "info",
    message: "",
  });

  const inputFields = [
    { label: "Name", value: name, setter: setName },
    { label: "EMail", value: email, setter: setEmail },
    { label: "Password", value: password, setter: setPassword },
    {
      label: "Password(確認)",
      value: passwordConfirmation,
      setter: setPasswordConfirmation,
    },
  ];

  const isBlankSomeField = () => {
    return (
      name === "" ||
      email === "" ||
      password === "" ||
      passwordConfirmation === ""
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isBlankSomeField()) {
      setToastProps({
        severity: "info",
        message: "空欄の項目があります。",
      });
      setToastOpen(true);
      return;
    }

    try {
      const res = await signUp(TEST_DATA);
      console.log("res", res);

      if (res.status === 200) {
        console.log("200です");
      } else {
        setToastProps({
          severity: "error",
          message: res.data.errors.full_messages.join(""),
        });
        setToastOpen(true);
      }
    } catch (err) {
      console.log("err", err);

      setToastProps({
        severity: "error",
        message: err.response.data.errors.full_messages.join(""),
      });
      setToastOpen(true);
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
                variant="outlined"
                required
                fullWidth
                label={field.label}
                value={field.value}
                margin="dense"
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
