// src/shared/api/hooks/useConfigQueries.ts
import { useQuery } from "@tanstack/react-query";
import { getPageUrls, getToggles, getUrls } from "../api/configApi";
import { configKeys } from "../lib/const";

export const useGetUrls = () => {
  return useQuery({
    queryKey: configKeys.urls,
    queryFn: getUrls,
    staleTime: 1000 * 60 * 60, // 1 час — конфиг редко меняется
  });
};

export const useGetPageUrls = () => {
  return useQuery({
    queryKey: configKeys.pageUrls,
    queryFn: getPageUrls,
    staleTime: Infinity, // urls.json почти никогда не меняется
  });
};

export const useGetToggles = () => {
  return useQuery({
    queryKey: configKeys.toggles,
    queryFn: getToggles,
    staleTime: 1000 * 60 * 10, // 10 минут
  });
};