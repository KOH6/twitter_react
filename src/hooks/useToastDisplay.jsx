import { useState } from "react";

export const useToastDisplay = () => {
  const [toastOpen, setToastOpen] = useState(false);
  const [toastProps, setToastProps] = useState({
    severity: "info",
    message: "",
  });

  const openToast = (severity, message) => {
    setToastProps({
      severity: severity,
      message: message,
    });
    setToastOpen(true);
  };

  return {
    toastOpen,
    setToastOpen,
    toastProps,
    setToastProps,
    openToast,
  };
};
