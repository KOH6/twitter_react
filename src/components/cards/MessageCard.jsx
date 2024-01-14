import React from "react";
import { Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../globalStates/atoms";

const currentUserDesign = {
  justifyContent: "flex-end",
  borderRadius: "15px 15px 0 15px",
  fontColor: "#F3F8FD",
  background: "#1E9BF0",
};

const otherDesign = {
  justifyContent: "flex-start",
  borderRadius: "15px 15px 15px 0",
  fontColor: "#0E1419",
  background: "#EEF3F4",
};

export const MessageCard = (props) => {
  const { message } = props;
  const currentUser = useRecoilValue(currentUserState);

  const design =
    currentUser.id === message.user_id ? currentUserDesign : otherDesign;

  return (
    <div
      style={{
        margin: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: design.justifyContent,
      }}
    >
      <Typography
        variant="body1"
        sx={{
          px: 2,
          color: design.fontColor,
          background: design.background,
          borderRadius: design.borderRadius,
          width: "70%",
          textAlign: "left",
          whiteSpace: "pre-line",
        }}
      >
        {message.content}
      </Typography>
    </div>
  );
};
