import React from "react";

import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";

import { ToastMessage } from "../components/utils/ToastMessage";

import { signUp } from "../apis/signUp";

import { useToastDisplay } from "../hooks/useToastDisplay.jsx";
import { useSignUp } from "../hooks/useSignUp.jsx";

export const SignUp = () => {
  const { signUpFields, signUpParams, isBlankSomeField } = useSignUp();
  const { toastOpen, setToastOpen, toastProps, openToast } = useToastDisplay();

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
            {signUpFields.map((field) => (
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
