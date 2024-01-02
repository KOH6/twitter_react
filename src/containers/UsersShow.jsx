import React from "react";

import { UserDetail } from "../components/details/UserDetail";
import { useUserFetch } from "../hooks/users/useUserFetch";

export const UsersShow = () => {
  const { post } = useUserFetch();

  return <UserDetail post={post} />;
};
