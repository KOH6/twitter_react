import { useState } from "react";
import { CONFIRM_SUCCESS_URL } from "../urls/index";

export const useSignUp = () => {
  const initialUser = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: "",
    birthdate: "",
  };

  const [newUser, setNewUser] = useState(initialUser);

  const onChangeNewUser = (e) => {
    const { name, value } = e.target;
    setNewUser((prevNewUser) => ({ ...prevNewUser, [name]: value }));
  };

  const signUpFields = [
    {
      label: "ユーザ名",
      name: "name",
      type: "text",
      helperText: "",
    },
    {
      name: "email",
      label: "メールアドレス",
      type: "text",
      helperText: "",
    },
    {
      name: "password",
      label: "パスワード",
      type: "password",
      helperText: "6文字以上",
    },
    {
      name: "password_confirmation",
      label: "パスワード(確認)",
      type: "password",
      helperText: "",
    },
    {
      name: "phone",
      label: "電話番号",
      type: "text",
      helperText: "",
    },
    {
      name: "birthdate",
      label: "生年月日",
      type: "date",
      helperText: "",
    },
  ];

  const signUpParams = { ...newUser, confirm_success_url: CONFIRM_SUCCESS_URL };

  const isBlankSomeField = (user) => {
    return Object.keys(user).some((key) => !user[key]);
  };

  return {
    newUser,
    signUpFields,
    signUpParams,
    isBlankSomeField,
    onChangeNewUser,
  };
};
