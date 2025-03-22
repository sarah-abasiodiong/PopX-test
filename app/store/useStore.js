import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set, get) => ({
      users: [],
      currentUser: null,
      addUser: (user) =>
        set((state) => ({
          users: [...state.users, user],
        })),
      login: (email, password) => {
        const users = get().users;
        const user = users.find(
          (u) => u.email === email && u.password === password
        );

        if (user) {
          set({ currentUser: user });
          return true;
        }
        return false;
      },
      logout: () => set({ currentUser: null }),
      getUserByEmail: (email) => {
        const users = get().users;
        return users.find((u) => u.email === email);
      },
    }),
    {
      name: "user-storage",
    }
  )
);
