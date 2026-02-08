import { create } from 'zustand';

interface DimensionState {
  mode: 'NORMAL' | 'STORE';
  setMode: (mode: 'NORMAL' | 'STORE') => void;
  toggleMode: () => void;
}

export const useDimensionStore = create<DimensionState>((set) => ({
  mode: 'NORMAL',
  setMode: (newMode) => set({ mode: newMode }),
  toggleMode: () => set((state) => ({
    mode: state.mode === 'NORMAL' ? 'STORE' : 'NORMAL'
  })),
}));