import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { LocalStorageState } from "./types";

const useLocalStorage = create<LocalStorageState>()(
  devtools(
    persist(
      (set) => ({
        url: null,
        setUrl: (url) => set({ url }),
      }),
      {
        name: "local-storage",
      }
    ),
    {
      name: "LocalStorage", // имя в Redux DevTools
    }
  )
);

export default useLocalStorage