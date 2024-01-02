import axios from "axios";

import { users } from "../urls/index";

export const fetchUser = (user_name) => {
  return axios.get(`${users}/${user_name}`);
};
