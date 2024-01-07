import axios from "axios";

import { users, profile } from "../urls/index";

export const fetchUser = (user_name) => {
  return axios.get(`${users}/${user_name}`);
};

export const updateUser = (formData, headers) => {
  return axios.post(profile, formData, { headers: headers });
};
