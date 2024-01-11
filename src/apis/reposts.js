import axios from "axios";
import Cookies from "js-cookie";

import { tweets } from "../urls/index";

const headers = {
  "access-token": Cookies.get("_access_token"),
  client: Cookies.get("_client"),
  uid: Cookies.get("_uid"),
};

export const createRepost = (id) => {
  return axios.post(`${tweets}/${id}/retweets`, null, { headers: headers });
};

export const deleteRepost = (id) => {
  return axios.delete(`${tweets}/${id}/retweets`, { headers: headers });
};
