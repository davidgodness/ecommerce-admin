import { create } from "zustand";

interface StoreModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useStoreModal = create<StoreModalState>()((set) => ({
  isOpen: false,
  onOpen: () => set((state) => ({ isOpen: true })),
  onClose: () => set((state) => ({ isOpen: false })),
}));
