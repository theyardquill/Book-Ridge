import { create } from "zustand";
import { Book } from "@/types";

interface PreviewModalStore {
    isOpen:boolean;
    data?: Book;
    onOpen: (data: Book) => void;
    onClose: () => void;
}

const usePreviewModal = create<PreviewModalStore>((set) => ({
    isOpen: false,
    data: undefined,
    onOpen: (data: Book) => set({ data, isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default usePreviewModal;