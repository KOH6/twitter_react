import axios from "axios";

import { tweets, images } from "../urls/index";

export const createPost = (params, headers) => {
  return axios.post(tweets, params, { headers: headers });
};

export const attachImages = (params, headers) => {
  return axios.post(images, params, { headers: headers });
};
