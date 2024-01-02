import axios from "axios";

import { users } from "../urls/index";

export const fetchUser = (id) => {
  return axios.get(`${users}/${id}`);
};
