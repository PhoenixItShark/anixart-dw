import { Star } from "lucide-react";
import { useState } from "react";
import { cn } from "@shared/lib/utils";
import { useReleaseVote } from "@entities/anime/model";

interface ReleaseVoteProps {
  releaseId: string;
  grade: number;
  voteCount: number;
  yourVote: number;
  voteCounts: [number, number, number, number, number];
  isAuthenticated: boolean;
  onRequireAuth: () => void;
}

const ReleaseVote = ({
  releaseId,
  grade,
  voteCount,
  yourVote,
  voteCounts,
  isAuthenticated,
  onRequireAuth,
}: ReleaseVoteProps) => {
  const [hover, setHover] = useState(0);
  const voteMutation = useReleaseVote(releaseId, yourVote);

  const handleVote = (n: number) => {
    if (!isAuthenticated) {
      onRequireAuth();
      return;
    }
    voteMutation.mutate(n);
  };

  const active = hover || yourVote;
  const maxCount = Math.max(...voteCounts, 1);

  return (
    <div className="flex items-stretch gap-5 bg-color-primary/70 border border-text-primary/20 rounded-xl px-5 py-3.5">
      <div className="flex flex-col justify-center items-center min-w-[72px] pr-5 border-r border-text-primary/15">
        <span className="text-3xl font-bold text-text-secondary leading-none">
          {grade ? grade.toFixed(1) : "—"}
        </span>
        <span className="text-[11px] text-text-primary mt-1.5 text-center">
          {voteCount}{" "}
          {voteCount === 1
            ? "голос"
            : voteCount < 5
              ? "голоса"
              : "голосов"}
        </span>
      </div>

      <div className="flex flex-col gap-[7px] justify-center py-0.5">
        {[5, 4, 3, 2, 1].map((n) => {
          const count = voteCounts[n - 1];
          const pct = (count / maxCount) * 100;
          return (
            <div
              key={n}
              className="flex items-center gap-2 group/bar"
              title={`${n}★ — ${count}`}
            >
              <span className="text-[10px] text-text-primary w-3 text-right leading-none shrink-0">
                {n}
              </span>
              <div className="w-24 h-1.5 rounded-full bg-text-primary/15 overflow-hidden">
                <div
                  className="h-full rounded-full bg-red/70 group-hover/bar:bg-red transition-all duration-300"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col justify-center gap-1 pl-4 border-l border-text-primary/15">
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(0)}
              onClick={() => handleVote(n)}
              className="p-0.5 transition-transform hover:scale-125 active:scale-95 disabled:opacity-50"
              disabled={voteMutation.isPending}
              title={n === yourVote ? "Убрать оценку" : `Оценить на ${n}★`}
            >
              <Star
                width={20}
                height={20}
                className={cn(
                  "transition-colors",
                  n <= active ? "text-red fill-red" : "text-text-primary"
                )}
              />
            </button>
          ))}
        </div>
        <span className="text-[11px] text-text-primary whitespace-nowrap">
          {yourVote ? (
            <>
              Ваша оценка:{" "}
              <span className="text-red font-semibold">{yourVote}★</span>
              <button
                onClick={() => handleVote(yourVote)}
                className="ml-1.5 underline decoration-text-primary/40 hover:text-red transition-colors"
              >
                убрать
              </button>
            </>
          ) : (
            "Оцените тайтл"
          )}
        </span>
      </div>
    </div>
  );
};

export default ReleaseVote;
