import { useState } from "react";
import { CONFIRM_SUCCESS_URL } from "../urls/index";

export const useSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [phone, setPhone] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const signUpFields = [
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

  return {
    signUpFields,
    signUpParams,
    isBlankSomeField,
  };
};
