import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CornerUpLeft,
  EyeOff,
  Loader2,
  MessageSquare,
  Send,
  ShieldAlert,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import {
  CommentSort,
  CommentVote,
  ReleaseComment,
} from "@entities/anime/types";
import { ApiError } from "@entities/anime/api";
import {
  useAddComment,
  useCommentReplies,
  useCommentVote,
  useReleaseComments,
} from "@entities/anime/model";
import { useUserStore } from "@entities/User";
import { cn } from "@shared/lib/utils";
import { formatRelativeTime } from "../lib/utils/formatRelativeTime";

const SORTS: { id: CommentSort; label: string }[] = [
  { id: CommentSort.Newest, label: "Новые" },
  { id: CommentSort.Oldest, label: "Старые" },
  { id: CommentSort.Popular, label: "Популярные" },
];

const plural = (n: number, one: string, few: string, many: string) => {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
  return many;
};

const commentErrorText = (error: unknown): string => {
  if (!(error instanceof ApiError)) return "Не удалось выполнить действие";
  switch (error.code) {
    case 401:
      return "Войдите в аккаунт";
    case 402:
      return "Аккаунт заблокирован";
    case 403:
      return "Аккаунт заблокирован навсегда";
    case 1:
      return "Серверная ошибка, попробуйте позже";
    default:
      return "Не удалось выполнить действие";
  }
};

const CommentAvatar = ({
  avatar,
  login,
  size = "md",
}: {
  avatar: string | null;
  login: string;
  size?: "md" | "sm";
}) =>
  avatar ? (
    <img
      src={avatar}
      alt={login}
      className={cn(
        "rounded-full object-cover shrink-0",
        size === "md" ? "w-10 h-10" : "w-7 h-7"
      )}
    />
  ) : (
    <div
      className={cn(
        "rounded-full bg-text-primary shrink-0 flex items-center justify-center",
        size === "md" ? "w-10 h-10" : "w-7 h-7"
      )}
    >
      <span
        className={cn(
          "font-bold text-background-primary",
          size === "md" ? "text-base" : "text-xs"
        )}
      >
        {login.charAt(0).toUpperCase()}
      </span>
    </div>
  );

const MessageText = ({
  comment,
  spoilerOpen,
  onOpenSpoiler,
}: {
  comment: ReleaseComment;
  spoilerOpen: boolean;
  onOpenSpoiler: () => void;
}) => {
  if (comment.is_spoiler && !spoilerOpen) {
    return (
      <div className="relative overflow-hidden rounded-lg border border-text-primary/30">
        <p className="text-sm text-text-secondary blur-md select-none px-3 py-2">
          {comment.message}
        </p>
        <button
          onClick={onOpenSpoiler}
          className="absolute inset-0 flex items-center justify-center gap-2 text-xs font-semibold text-text-secondary bg-background-primary/70 backdrop-blur-[2px] hover:text-red transition-colors"
        >
          <EyeOff width={15} height={15} />
          Показать спойлер
        </button>
      </div>
    );
  }
  return (
    <p className="text-sm text-text-secondary whitespace-pre-line break-words">
      {comment.message}
    </p>
  );
};

const CommentReplies = ({
  commentId,
  releaseId,
  replyCount,
  startOpen,
}: {
  commentId: number;
  releaseId: string;
  replyCount: number;
  startOpen: boolean;
}) => {
  const [open, setOpen] = useState(startOpen);
  const [limit, setLimit] = useState(2);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useCommentReplies(commentId, CommentSort.Newest, open);

  if (!open) {
    if (!replyCount) return null;
    return (
      <div className="ml-3 pl-5 border-l border-text-primary/10 pb-1">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-1.5 text-xs font-medium text-text-primary hover:text-red transition-colors"
        >
          <CornerUpLeft width={13} height={13} />
          Показать {replyCount}{" "}
          {plural(replyCount, "ответ", "ответа", "ответов")}
        </button>
      </div>
    );
  }

  const replies = data?.pages.flatMap((p) => p.content) ?? [];
  const total = data?.pages[0]?.total_count ?? replyCount;
  const visible = replies.slice(0, limit);
  const hidden = total - limit;

  return (
    <div className="ml-3 pl-5 border-l border-text-primary/10 flex flex-col">
      {isPending && !replies.length ? (
        <div className="flex justify-center py-3">
          <Loader2 width={18} height={18} className="animate-spin text-red" />
        </div>
      ) : (
        visible.map((reply) => (
          <CommentNode
            key={reply.id}
            comment={reply}
            releaseId={releaseId}
            isLast={false}
          />
        ))
      )}
      {hidden > 0 && (
        <div className="py-1.5 pl-4">
          <button
            onClick={() => {
              setLimit((l) => l + 10);
              if (hasNextPage) fetchNextPage();
            }}
            disabled={isFetchingNextPage}
            className="text-xs font-medium text-text-primary hover:text-red transition-colors"
          >
            Показать ещё {hidden}{" "}
            {plural(hidden, "ответ", "ответа", "ответов")}
          </button>
        </div>
      )}
    </div>
  );
};

const CommentNode = ({
  comment,
  releaseId,
  isLast,
}: {
  comment: ReleaseComment;
  releaseId: string;
  isLast: boolean;
}) => {
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);
  const navigate = useNavigate();

  const [spoilerOpen, setSpoilerOpen] = useState(false);
  const [replying, setReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replySpoiler, setReplySpoiler] = useState(false);
  const [voteError, setVoteError] = useState<string | null>(null);

  const addComment = useAddComment(releaseId);
  const voteMutation = useCommentVote(releaseId, comment.id);

  const handleVote = (vote: CommentVote) => {
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }
    setVoteError(null);
    voteMutation.mutate(vote, {
      onError: (error) => {
        setVoteError(commentErrorText(error));
        setTimeout(() => setVoteError(null), 4000);
      },
    });
  };

  const submitReply = () => {
    const message = replyText.trim();
    if (!message) return;
    addComment.mutate(
      {
        message,
        spoiler: replySpoiler,
        parentCommentId: comment.id,
        replyToProfileId: comment.profile.id,
      },
      {
        onSuccess: () => {
          setReplyText("");
          setReplySpoiler(false);
          setReplying(false);
        },
      }
    );
  };

  return (
    <div className={cn("px-4 py-3.5", !isLast && "border-b border-text-primary/20")}>
      {comment.is_deleted ? (
        <p className="text-sm text-text-primary/60 italic">Комментарий удалён</p>
      ) : (
        <div className="flex gap-3">
          <CommentAvatar avatar={comment.profile.avatar} login={comment.profile.login} />
          <div className="flex-1 min-w-0 flex flex-col gap-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <Link
                to={`/profile/${comment.profile.id}`}
                className="font-semibold text-text-secondary text-sm hover:text-red transition-colors"
              >
                {comment.profile.login}
              </Link>
              {comment.profile.is_verified && (
                <span className="text-[10px] bg-sky-500/20 text-sky-400 border border-sky-500/30 rounded px-1 py-px uppercase">
                  verify
                </span>
              )}
              {comment.profile.is_sponsor && (
                <span className="text-[10px] bg-red/20 text-red border border-red/30 rounded px-1 py-px uppercase">
                  sponsor
                </span>
              )}
              <span className="text-xs text-text-primary">
                {formatRelativeTime(comment.timestamp)}
              </span>
              {comment.is_edited && (
                <span className="text-xs text-text-primary/70">изменён</span>
              )}
            </div>

            <MessageText
              comment={comment}
              spoilerOpen={spoilerOpen}
              onOpenSpoiler={() => setSpoilerOpen(true)}
            />

            <div className="flex items-center gap-1 mt-0.5">
              <button
                onClick={() => handleVote(CommentVote.Like)}
                disabled={voteMutation.isPending}
                className={cn(
                  "flex items-center justify-center w-7 h-7 rounded-md transition-colors disabled:opacity-50",
                  comment.vote === CommentVote.Like
                    ? "text-red bg-red/10"
                    : "text-text-primary hover:text-red hover:bg-color-primary"
                )}
                title="Нравится"
              >
                <ThumbsUp width={14} height={14} />
              </button>
              <span
                className={cn(
                  "text-xs font-semibold min-w-[16px] text-center",
                  comment.vote_count > 0
                    ? "text-green-500"
                    : comment.vote_count < 0
                      ? "text-red"
                      : "text-text-primary"
                )}
              >
                {comment.vote_count}
              </span>
              <button
                onClick={() => handleVote(CommentVote.Dislike)}
                disabled={voteMutation.isPending}
                className={cn(
                  "flex items-center justify-center w-7 h-7 rounded-md transition-colors disabled:opacity-50",
                  comment.vote === CommentVote.Dislike
                    ? "text-red bg-red/10"
                    : "text-text-primary hover:text-red hover:bg-color-primary"
                )}
                title="Не нравится"
              >
                <ThumbsDown width={14} height={14} />
              </button>

              <button
                onClick={() => {
                  if (!isAuthenticated) {
                    navigate("/auth");
                    return;
                  }
                  setReplying((v) => !v);
                }}
                className="ml-2 text-xs font-medium text-text-primary hover:text-red transition-colors"
              >
                Ответить
              </button>
            </div>
            {voteError && (
              <span className="text-xs text-red">{voteError}</span>
            )}

            {replying && (
              <>
                <div className="flex gap-2 mt-1.5 items-end">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyDown={(e) => {
                      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") submitReply();
                    }}
                    rows={2}
                    placeholder={`Ответить @${comment.profile.login}...`}
                    className="flex-1 bg-color-primary border border-text-primary/30 rounded-lg px-3 py-2 text-sm text-text-secondary placeholder:text-text-primary resize-none outline-none focus:border-red/60 transition-colors"
                  />
                  <div className="flex flex-col gap-1.5">
                    <button
                      type="button"
                      onClick={() => setReplySpoiler((v) => !v)}
                      className={cn(
                        "flex items-center justify-center w-9 h-9 rounded-lg border transition-colors",
                        replySpoiler
                          ? "text-red border-red/40 bg-red/10"
                          : "text-text-primary border-text-primary/20 hover:text-text-secondary"
                      )}
                      title="Спойлер"
                    >
                      <EyeOff width={15} height={15} />
                    </button>
                    <button
                      onClick={submitReply}
                      disabled={!replyText.trim() || addComment.isPending}
                      className="flex items-center justify-center w-9 h-9 bg-red text-white rounded-lg hover:opacity-90 active:scale-[0.98] transition disabled:opacity-40 disabled:cursor-not-allowed"
                      title="Отправить (Ctrl+Enter)"
                    >
                      {addComment.isPending ? (
                        <Loader2 width={15} height={15} className="animate-spin" />
                      ) : (
                        <Send width={15} height={15} />
                      )}
                    </button>
                  </div>
                </div>
                {addComment.isError && (
                  <span className="text-xs text-red">{commentErrorText(addComment.error)}</span>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {!comment.is_deleted && (
        <CommentReplies
          commentId={comment.id}
          releaseId={releaseId}
          replyCount={comment.reply_count}
          startOpen={false}
        />
      )}
    </div>
  );
};

const ReleaseComments = ({ releaseId }: { releaseId: string }) => {
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);
  const user = useUserStore((s) => s.username);
  const userAvatar = useUserStore((s) => s.avatar);
  const navigate = useNavigate();

  const [sort, setSort] = useState(CommentSort.Newest);
  const [text, setText] = useState("");
  const [spoiler, setSpoiler] = useState(false);
  const [sentNotice, setSentNotice] = useState(false);

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useReleaseComments(releaseId, sort);
  const addComment = useAddComment(releaseId);

  const comments = data?.pages.flatMap((p) => p.content) ?? [];

  const submit = () => {
    const message = text.trim();
    if (!message) return;
    addComment.mutate(
      { message, spoiler },
      {
        onSuccess: () => {
          setText("");
          setSpoiler(false);
          setSentNotice(true);
          setTimeout(() => setSentNotice(false), 4000);
        },
      }
    );
  };

  return (
    <section className="flex flex-col gap-4">
      <h2 className="flex items-center gap-2 text-xl font-bold text-text-secondary border-l-[3px] border-red pl-3">
        <MessageSquare width={20} height={20} className="text-red" />
        Комментарии
      </h2>

      <div className="flex gap-1 bg-color-primary border border-text-primary/25 rounded-lg p-1 w-fit">
        {SORTS.map((s) => (
          <button
            key={s.id}
            onClick={() => setSort(s.id)}
            className={cn(
              "px-3 py-1.5 rounded-md text-sm transition-colors",
              sort === s.id
                ? "bg-red text-white font-semibold"
                : "text-text-primary hover:text-text-secondary"
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      {isAuthenticated ? (
        <div className="flex gap-3 bg-color-primary border border-text-primary/30 rounded-xl p-4">
          <CommentAvatar avatar={userAvatar} login={user ?? "?"} />
          <div className="flex-1 flex flex-col gap-2 min-w-0">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === "Enter") submit();
              }}
              rows={3}
              placeholder="Оставить комментарий..."
              className="w-full bg-background-primary border border-text-primary/30 rounded-lg px-3 py-2.5 text-sm text-text-secondary placeholder:text-text-primary resize-none outline-none focus:border-red/60 transition-colors"
            />
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSpoiler((v) => !v)}
                className={cn(
                  "flex items-center gap-1.5 text-xs font-medium rounded-lg px-2.5 py-1.5 border transition-colors",
                  spoiler
                    ? "text-red border-red/40 bg-red/10"
                    : "text-text-primary border-text-primary/20 hover:text-text-secondary"
                )}
                title="Пометить как спойлер"
              >
                <EyeOff width={14} height={14} />
                Спойлер
              </button>
              <button
                onClick={submit}
                disabled={!text.trim() || addComment.isPending}
                className="flex items-center gap-2 bg-red text-white font-semibold text-sm px-4 py-2 rounded-lg hover:opacity-90 active:scale-[0.98] transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {addComment.isPending ? (
                  <Loader2 width={15} height={15} className="animate-spin" />
                ) : (
                  <Send width={15} height={15} />
                )}
                Отправить
              </button>
            </div>
            {addComment.isError && (
              <span className="text-xs text-red">{commentErrorText(addComment.error)}</span>
            )}
            {sentNotice && (
              <span className="text-xs text-green-500">
                Комментарий отправлен
              </span>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3 bg-color-primary rounded-xl border border-text-primary/20 p-4 text-sm text-text-primary">
          <ShieldAlert width={18} height={18} className="text-red shrink-0" />
          <span>
            <button
              onClick={() => navigate("/auth")}
              className="text-red font-semibold hover:underline"
            >
              Войдите
            </button>{" "}
            в аккаунт, чтобы оставить комментарий
          </span>
        </div>
      )}

      <div className="bg-background-primary border border-text-primary/30 rounded-xl overflow-hidden">
        {isLoading && !comments.length ? (
          <div className="flex justify-center py-10">
            <Loader2 width={28} height={28} className="animate-spin text-red" />
          </div>
        ) : comments.length === 0 ? (
          <p className="text-text-primary text-sm py-8 text-center">
            Пока нет комментариев — станьте первым!
          </p>
        ) : (
          comments.map((comment, i) => (
            <CommentNode
              key={comment.id}
              comment={comment}
              releaseId={releaseId}
              isLast={i === comments.length - 1 && !hasNextPage}
            />
          ))
        )}

        {hasNextPage && (
          <div className="flex justify-center py-3 border-t border-text-primary/20">
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="flex items-center gap-2 text-sm font-semibold text-text-secondary hover:text-red transition-colors disabled:opacity-50"
            >
              {isFetchingNextPage && (
                <Loader2 width={16} height={16} className="animate-spin" />
              )}
              Показать ещё
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReleaseComments;
