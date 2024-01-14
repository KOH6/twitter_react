import React from "react";
import { Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../globalStates/atoms";
import { formatDateTime } from "../../lib/utility";

const currentUserDesign = {
  justifyContent: "flex-end",
  alignItems: "flex-end",
  borderRadius: "17px 17px 2px 17px",
  fontColor: "#F3F8FD",
  background: "#1E9BF0",
};

const otherDesign = {
  justifyContent: "flex-start",
  alignItems: "flex-start",
  borderRadius: "17px 17px 17px 2px",
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
        flexDirection: "column",
        alignItems: design.alignItems,
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
          width: "60%",
          textAlign: "left",
          whiteSpace: "pre-line",
        }}
      >
        {message.content}
      </Typography>
      <Typography variant="body2" sx={{ my: 1 }}>
        {formatDateTime(new Date(message.created_at))}
      </Typography>
    </div>
  );
};
