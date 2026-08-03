import { ProfileListStatus } from "../types";

export interface ProfileListOption {
  id: Exclude<ProfileListStatus, 0>;
  label: string;
  color: string;
}

export const PROFILE_LISTS: ProfileListOption[] = [
  { id: 1, label: "Смотрю", color: "bg-green-500" },
  { id: 2, label: "В планах", color: "bg-sky-500" },
  { id: 3, label: "Просмотрено", color: "bg-red-500" },
  { id: 4, label: "Отложено", color: "bg-amber-500" },
  { id: 5, label: "Брошено", color: "bg-zinc-400" },
];

export const PROFILE_LIST_OPTIONS = PROFILE_LISTS;

export const getProfileListOption = (
  status: ProfileListStatus | null
): ProfileListOption | undefined =>
  PROFILE_LISTS.find((l) => l.id === status);
