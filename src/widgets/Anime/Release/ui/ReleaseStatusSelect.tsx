import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, ListPlus } from "lucide-react";
import { cn } from "@shared/lib/utils";
import {
  PROFILE_LISTS,
  getProfileListOption,
} from "@entities/anime/const";
import { ProfileListStatus } from "@entities/anime/types";
import { useProfileListMutation } from "@entities/anime/model";

interface ReleaseStatusSelectProps {
  releaseId: string;
  currentStatus: ProfileListStatus | null;
  isAuthenticated: boolean;
  onRequireAuth: () => void;
}

const ReleaseStatusSelect = ({
  releaseId,
  currentStatus,
  isAuthenticated,
  onRequireAuth,
}: ReleaseStatusSelectProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const mutation = useProfileListMutation(releaseId);
  const activeOption = getProfileListOption(currentStatus);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = (statusId: ProfileListStatus) => {
    if (!isAuthenticated) {
      onRequireAuth();
      return;
    }
    if (currentStatus === statusId) {
      mutation.remove.mutate(statusId);
    } else {
      mutation.add.mutate(statusId);
    }
    setOpen(false);
  };

  const isPending = mutation.add.isPending || mutation.remove.isPending;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => {
          if (!isAuthenticated) {
            onRequireAuth();
            return;
          }
          setOpen((v) => !v);
        }}
        disabled={isPending}
        className={cn(
          "flex items-center gap-2 py-2.5 px-4 rounded-lg border font-semibold text-sm transition",
          activeOption
            ? "bg-color-primary/80 border-text-primary/20 text-text-secondary hover:border-text-primary/50"
            : "bg-color-primary/60 border-dashed border-text-primary/40 text-text-primary hover:border-text-primary"
        )}
        title={activeOption ? `В списке: ${activeOption.label}` : "Добавить в список"}
      >
        {activeOption ? (
          <>
            <span className={cn("w-2 h-2 rounded-full", activeOption.color)} />
            {activeOption.label}
          </>
        ) : (
          <>
            <ListPlus width={18} height={18} />
            В мой список
          </>
        )}
        <ChevronDown
          width={16}
          height={16}
          className={cn("transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <div className="absolute z-30 mt-2 w-48 py-1.5 bg-background-primary border border-text-primary/30 rounded-xl shadow-2xl shadow-black/60">
          {PROFILE_LISTS.map((option) => {
            const isActive = currentStatus === option.id;
            return (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-text-secondary hover:bg-color-primary transition-colors text-left"
              >
                <span className={cn("w-2 h-2 rounded-full shrink-0", option.color)} />
                {option.label}
                {isActive && <Check width={15} height={15} className="ml-auto text-red" />}
              </button>
            );
          })}
          {activeOption && (
            <>
              <div className="my-1.5 h-px bg-text-primary/15" />
              <button
                onClick={() => handleSelect(activeOption.id)}
                className="w-full px-3.5 py-2 text-sm text-red hover:bg-color-primary transition-colors text-left"
              >
                Убрать из списка
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ReleaseStatusSelect;
