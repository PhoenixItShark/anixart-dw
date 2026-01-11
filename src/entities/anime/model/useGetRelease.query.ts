// src/entities/Release/model/useGetRelease.ts
import { useQuery } from "@tanstack/react-query";
import { getRelease } from "../api";


export const useGetRelease = (id: string) => {
  return useQuery({
    queryKey: ["release", id],
    queryFn: () => getRelease(id), 
    enabled: !!id, 
    staleTime: 1000 * 60 * 10, 
    retry: 2,
  });
};