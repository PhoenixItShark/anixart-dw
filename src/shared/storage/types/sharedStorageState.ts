export type SharedStoreState = {
  contentRef: HTMLDivElement | null;
  savedScroll: number;
  setContentRef: (ref: HTMLDivElement | null) => void;
  saveCurrentScroll: () => void; 
  restoreScroll: () => void;
};
