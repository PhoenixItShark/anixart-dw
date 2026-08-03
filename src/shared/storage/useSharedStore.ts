// src/shared/lib/store/scrollStore.ts
import { create } from "zustand";
import { SharedStoreState } from "./types";



const useSharedStore = create<SharedStoreState>((set, get) => ({
  contentRef: null,
  savedScroll: 0,

  setContentRef: (ref) => set({ contentRef: ref }),

  saveCurrentScroll: () => {
    const { contentRef } = get();
    if (contentRef) {
      
      set({ savedScroll: contentRef.scrollTop });
    }
  },

  restoreScroll: () => {
    const { contentRef, savedScroll } = get();
    console.log("Restoring scroll position:", savedScroll);
    if (contentRef && savedScroll > 0) {
      requestAnimationFrame(() => {
        contentRef.scrollTop = savedScroll;
      });
    }
  },
}));

export default useSharedStore