import { atom, selector } from "recoil";

export const userRoleState = atom<string | null>({
  key: "userRoleState",
  default: null, // ✅ localStorage 직접 참조 X
});

export const isAdminState = selector<boolean>({
  key: "isAdminState",
  get: ({ get }) => {
    const role = get(userRoleState);
    return role === "ADMIN";
  },
});
