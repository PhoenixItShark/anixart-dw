// src/entities/user/model/userStore.ts

import { AnimeFilterParams } from '@/entities/AnimeList/types';
import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

interface UserState {
  // Данные пользователя
  token: string | null;
  id: number | null;
  username: string | null;
  filter: AnimeFilterParams | null;
  avatar: string | null;
  isAuthenticated: boolean;

  // Действия
  login: (data: {
    token: string;
    id: number;
    username: string;
    avatar?: string;
  }) => void;
  setFilter: (filter: AnimeFilterParams) => void;
  logout: () => void;
  updateAvatar: (avatar: string) => void;
  updateUsername: (username: string) => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        token: null,
        id: null,
        username: null,
        filter: null,
        avatar: null,
        isAuthenticated: false,

        login: (data) =>
          set({
            token: data.token,
            id: data.id,
            username: data.username,
            avatar: data.avatar ?? null,
            isAuthenticated: true,
          }),
        setFilter: (filter) => set({ filter: filter }),
        logout: () =>
          set({
            token: null,
            id: null,
            username: null,
            avatar: null,
            isAuthenticated: false,
          }),

        updateAvatar: (avatar) => set({ avatar }),
        updateUsername: (username) => set({ username }),
      }),
      {
        name: 'user-storage', // Ключ в localStorage
        storage: createJSONStorage(() => localStorage), 
        partialize: (state) => ({
          id: state.id,
          username: state.username,
          avatar: state.avatar,
          isAuthenticated: state.isAuthenticated,
          // token: state.token, // ← раскомментируй, если хочешь сохранять и токен
        }),
      }
    ),
    {
      name: 'UserStore', // ← Это название будет в Redux DevTools
     
    }
  )
);