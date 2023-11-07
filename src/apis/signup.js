import axios from "axios";
import { signUp } from "../urls/index";

export const createUser = (params) => {
  return axios.post(signUp, params);
};
