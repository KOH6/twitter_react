import axios from "axios";

import { groups } from "../urls/index";
import { createDefaultHeaders } from "../lib/utility.js";

export const fetchGroups = () => {
  return axios.get(groups, {
    headers: createDefaultHeaders(),
  });
};

export const fetchMessages = (group_id) => {
  return axios.get(`${groups}/${group_id}/messages`, {
    headers: createDefaultHeaders(),
  });
};
