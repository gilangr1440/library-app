import { create } from "zustand";
import { BorrowCartType } from "../apis/borrows/types";
import { persist } from "zustand/middleware";

const cartStore = (set: any) => ({
  borrow: [],
  addBorrow: (data: BorrowCartType) => {
    set((state: any) => ({
      borrow: [...state.borrow, data],
    }));
  },
  deleteBorrow: (data: BorrowCartType[]) => {
    set({
      borrow: [...data],
    });
  },
});

export const useCartStore = create(
  persist(cartStore, {
    name: "cart-store",
  })
);
