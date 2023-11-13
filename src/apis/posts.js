import axios from "axios";

import { tweets, images } from "../urls/index";

export const createPost = (post, headers) => {
  return axios.post(tweets, { post: post }, { headers: headers });
};

export const attachImages = (formData, headers) => {
  return axios.post(images, formData, { headers: headers });
};

export const fetchAllPosts = (limit, offset) => {
  // TODO limit, offset対応
  return axios.get(tweets);
};
