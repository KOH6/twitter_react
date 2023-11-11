import { useState } from "react";
import { CONFIRM_SUCCESS_URL } from "../urls/index";
import { signUp } from "../apis/auth";
import { useSetRecoilState } from "recoil";
import { flashState } from "../globalStates/atoms/flashAtom";

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

  const signUpParams = { ...newUser, confirm_success_url: CONFIRM_SUCCESS_URL };

  const onChangeNewUser = (e) => {
    const { name, value } = e.target;
    setNewUser((prevNewUser) => ({ ...prevNewUser, [name]: value }));
  };

  const isBlankSomeField = (user) => {
    return Object.keys(user).some((key) => !user[key]);
  };

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
      if (res.status === 200) {
        setFlash({
          isOpen: true,
          severity: "success",
          message: "認証メールを送信しました。\r\nメールを確認してください。",
        });
      } else {
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

  return {
    newUser,
    signUpFields,
    onChangeNewUser,
    handleSubmit,
  };
};
