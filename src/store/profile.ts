import { atom } from "recoil";
import type { Profile } from "../types/profile";

export const profileState = atom<Profile>({
  key: "profileState",
  default: {
    avatar: "",
    name: "",
    keywords: [],
    balanceResults: [],
  },
});
