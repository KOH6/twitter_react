import axios from "axios";
import { users } from "../urls/index";

export const signUp = (params) => {
  return axios.post(users, params);
};
