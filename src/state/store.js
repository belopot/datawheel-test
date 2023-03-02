import create from 'zustand';

export const useStore = create((set, get) => ({
  // Menu
  menuVisible: false,
  setMenuVisible: v => set({menuVisible: v}),
}));
