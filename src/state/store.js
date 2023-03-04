import create from 'zustand';

export const useStore = create((set, get) => ({
  // Menu
  menuVisible: false,
  setMenuVisible: v => set({menuVisible: v}),
  // Country
  currentCountry: null,
  setCurrentCountry: v => set({currentCountry: v}),
  // Year
  currentYear: 2020,
  setCurrentYear: v => set({currentYear: v}),
}));
