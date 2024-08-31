import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      username: "",
      password: "",
     
      setLoginStatus: (status, username, password) =>
        set({ isLoggedIn: status, username, password }),
      resetUser: () =>
        set({
          isLoggedIn: false,
          username: "",
          password: "",
        }),
    }),
    {
      name: "user-storage", // Unique storage key
      getStorage: () => localStorage, // Specify storage type (localStorage)
    }
  )
);

export default useUserStore;
