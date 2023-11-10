import { atom } from "recoil";

const initialFlashState = {
  isOpen: false,
  severity: "info",
  message: "",
};

export const flashState = atom({
  key: "flash",
  default: initialFlashState,
});
