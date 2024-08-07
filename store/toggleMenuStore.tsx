import { create } from "zustand";
import { persist } from "zustand/middleware";

type MenuState = {
  isOpen: boolean;
  toggleMenu: () => void;
};

export const useMenuStore = create<MenuState>()(
  persist(
    (set) => ({
      isOpen: false,
      toggleMenu: () =>
        set((state) => ({
          isOpen: !state.isOpen,
        })),
    }),
    { name: "menu-store" }
  )
);
