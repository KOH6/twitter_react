import React from "react";

import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";

import { useSignUp } from "../hooks/useSignUp.jsx";

export const SignUp = () => {
  const { user, signUpFields, onChangeUser, handleSubmit } = useSignUp();

  return (
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
              value={user[field.name]}
              margin="normal"
              InputLabelProps={{ shrink: true }}
              helperText={field.helperText}
              onChange={(e) => onChangeUser(e)}
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
  );
};
