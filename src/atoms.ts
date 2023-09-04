import { atom } from "recoil";
import { lightTheme } from "./theme";

export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});
