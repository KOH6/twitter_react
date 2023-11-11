import axios from "axios";
import Cookies from "js-cookie";

import { users, sessions, sign_in } from "../urls/index";

export const signUp = (params) => {
  return axios.post(users, params);
};

export const logIn = (params) => {
  return axios.post(sign_in, params);
};

export const getCurrentUser = () => {
  // if (
  //   !Cookies.get("_access_token") ||
  //   !Cookies.get("_client") ||
  //   !Cookies.get("_uid")
  // )
  //   return;

  return axios.get(sessions, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};
