import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export const ToastMessage = (props) => {
  const { open, setOpen, severity, message } = props;

  const handleClose = (e, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={handleClose}
      >
        <Alert
          sx={{ whiteSpace: "pre-line" }}
          severity={severity}
          onClose={handleClose}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};
