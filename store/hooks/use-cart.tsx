import { create } from "zustand";
import { Book } from "@/types";
import { persist, createJSONStorage } from 'zustand/middleware'
import { toast } from "react-hot-toast";

interface CartStore {
    items: Book[];
    addItem: (data: Book) => void;
    removeItem: (id: string) => void;
    removeAll: () => void;
}

const useCart = create(persist<CartStore>((set, get) =>({
    items: [],
    addItem: (data: Book) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(item => item.id === data.id);

        if(existingItem) {
            return toast("Book Already Added To Cart!");
        }

        set({ items: [...get().items, data] })
        toast.success("Book Added to Your Cart Successfully!")
    },
    removeItem: (id: string) => {
        set({ items: [...get().items.filter(item => item.id !== id)] });
    },
    removeAll: () => set({ items: [] }),
}), {
    name: "cart-storage",
    storage: createJSONStorage(() => localStorage)
}))

export default useCart;
