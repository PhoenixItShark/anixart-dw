import { apiClient } from "@shared/api/client";
import { API_URLS } from "@shared/lib/const";
import {
  AnimePageResponse,
  CommentPagedResponse,
  CommentSort,
  CommentVote,
  ProfileListStatus,
} from "@entities/anime/types";

export interface DefaultResponse {
  code: number;
}

export class ApiError extends Error {
  code?: number;
  constructor(message: string, code?: number) {
    super(message);
    this.name = "ApiError";
    this.code = code;
  }
}

const checkCode = (res: { code?: number } | undefined): DefaultResponse => {
  if (!res || typeof res !== "object") {
    throw new ApiError("Пустой ответ API — проверьте вход в аккаунт");
  }
  if (res.code !== undefined && res.code !== 0) {
    throw new ApiError(`API error: code ${res.code}`, res.code);
  }
  return res as DefaultResponse;
};

export const addToProfileList = async (
  list: ProfileListStatus,
  releaseId: number
): Promise<DefaultResponse> => {
  const res = await apiClient.get(`${API_URLS.profileList}/add/${list}/${releaseId}`);
  return checkCode(res.data);
};

export const deleteFromProfileList = async (
  list: ProfileListStatus,
  releaseId: number
): Promise<DefaultResponse> => {
  const res = await apiClient.get(`${API_URLS.profileList}/delete/${list}/${releaseId}`);
  return checkCode(res.data);
};

export const addToFavorite = async (releaseId: number): Promise<DefaultResponse> => {
  const res = await apiClient.get(`${API_URLS.favorite}/add/${releaseId}`);
  return checkCode(res.data);
};

export const deleteFromFavorite = async (releaseId: number): Promise<DefaultResponse> => {
  const res = await apiClient.get(`${API_URLS.favorite}/delete/${releaseId}`);
  return checkCode(res.data);
};

export const addReleaseVote = async (
  releaseId: number,
  vote: number
): Promise<DefaultResponse> => {
  const res = await apiClient.get(`${API_URLS.vote}/add/${releaseId}/${vote}`);
  return checkCode(res.data);
};

export const deleteReleaseVote = async (releaseId: number): Promise<DefaultResponse> => {
  const res = await apiClient.get(`${API_URLS.vote}/delete/${releaseId}`);
  return checkCode(res.data);
};

export const getReleaseComments = async (
  releaseId: string,
  page: number,
  sort: CommentSort = CommentSort.Newest
): Promise<CommentPagedResponse> => {
  const res = await apiClient.get(`${API_URLS.comment}/all/${releaseId}/${page}`, {
    params: { sort },
  });
  return res.data;
};

export const getCommentReplies = async (
  commentId: number,
  page: number,
  sort: CommentSort = CommentSort.Newest
): Promise<CommentPagedResponse> => {
  const res = await apiClient.get(`${API_URLS.comment}/replies/${commentId}/${page}`, {
    params: { sort },
  });
  return res.data;
};

export const commentVote = async (
  commentId: number,
  vote: CommentVote
): Promise<DefaultResponse> => {
  const res = await apiClient.get(`${API_URLS.comment}/vote/${commentId}/${vote}`);
  return checkCode(res.data);
};

export const getRelatedReleases = async (
  franchiseId: number,
  page: number
): Promise<AnimePageResponse> => {
  const res = await apiClient.get(`${API_URLS.related}/${franchiseId}/${page}`, {
    headers: { "Api-Version": "v2" },
  });
  return res.data;
};

export const addReleaseComment = async (
  releaseId: string,
  body: {
    parentCommentId?: number | null;
    replyToProfileId?: number | null;
    message: string;
    isSpoiler: boolean;
  }
): Promise<DefaultResponse> => {
  const res = await apiClient.post(`${API_URLS.comment}/add/${releaseId}`, body);
  return checkCode(res.data);
};
