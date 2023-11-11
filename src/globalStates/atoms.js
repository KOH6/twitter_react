import { atom } from "recoil";

export const flashState = atom({
  key: "flash",
  default: {
    isOpen: false,
    severity: "info",
    message: "",
  },
});

export const loadingState = atom({
  key: "loading",
  default: false,
});
