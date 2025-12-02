import { useRecoilValue } from "recoil";
import { profileState } from "../store/profile";

export const useProfile = () => {
  const profile = useRecoilValue(profileState);
  return { profile };
};
