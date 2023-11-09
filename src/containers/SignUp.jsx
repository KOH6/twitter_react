import React from "react";

import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";

import { ToastMessage } from "../components/utils/ToastMessage";

import { signUp } from "../apis/signUp";

import { useSignUp } from "../hooks/useSignUp.jsx";
import { useSetRecoilState } from "recoil";
import { flashState } from "../globalStates/atoms/flashAtom";

export const SignUp = () => {
  const {
    newUser,
    signUpFields,
    signUpParams,
    isBlankSomeField,
    onChangeNewUser,
  } = useSignUp();

  const setFlash = useSetRecoilState(flashState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isBlankSomeField(newUser)) {
      setFlash({
        isOpen: true,
        severity: "info",
        message: "空欄の項目があります。",
      });
      return;
    }

    try {
      const res = await signUp(signUpParams);
      console.log("res", res);

      if (res.status !== 200) {
        setFlash({
          isOpen: true,
          severity: "error",
          message: res.data.errors.full_messages.join("\r\n"),
        });
      }
    } catch (err) {
      console.log("err", err);
      setFlash({
        isOpen: true,
        severity: "error",
        message: err.response.data.errors.full_messages.join("\r\n"),
      });
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
                name={field.name}
                value={newUser[field.name]}
                margin="normal"
                InputLabelProps={{ shrink: true }}
                helperText={field.helperText}
                onChange={(e) => onChangeNewUser(e)}
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

      <ToastMessage />
    </>
  );
};
