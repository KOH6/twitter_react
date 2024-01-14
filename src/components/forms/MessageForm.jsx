import React, { useState } from "react";

import { IconButton, Stack, TextField } from "@mui/material";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

const initialMessage = {
  content: "",
};

export const MessageForm = (props) => {
  // const { group, handleClick } = props;
  const [message, setMessage] = useState(initialMessage);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessage((prev) => ({ ...prev, [name]: value }));
  };

  console.log("message", message);

  return (
    <Stack direction="row" justifyContent="center" alignItems="center">
      <div style={{ width: "90%" }}>
        <TextField
          style={{
            borderRadius: "10px",
            backgroundColor: "#EFF3F4",
            padding: "0.2rem",
          }}
          required
          fullWidth
          multiline
          rows={2}
          name="content"
          value={message.content}
          InputLabelProps={{ shrink: true }}
          placeholder="新しいメッセージを作成"
          variant="standard"
          InputProps={{
            disableUnderline: true,
          }}
          onChange={handleChange}
        />
      </div>
      <IconButton
        disabled={message.content.length === 0}
        aria-label="delete"
        size="large"
        style={{
          backgroundColor: "#EFF3F4",
          color: "#98C8F2",
        }}
        // onClick={() => handleClick()}
      >
        <SendOutlinedIcon fontSize="inherit" />
      </IconButton>
    </Stack>
  );
};
