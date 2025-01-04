import { PortfolioTypes } from "@/types/RootTypes";
import { create } from "zustand";

interface PortfolioState {
  isPending: boolean;
  isError: string;
  data: PortfolioTypes[] | [];
  getPortfolioPending: () => void;
  getPortfolioSuccess: (data: PortfolioTypes[]) => void;
  getPortfolioError: (error: string) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  isPending: false,
  isError: "",
  data: [],

  getPortfolioPending: () => {
    set({ isPending: true, isError: "" });
  },

  getPortfolioSuccess: (data: PortfolioTypes[]) => {
    set({ data, isPending: false });
  },

  getPortfolioError: (error: string) => {
    set({ isPending: false, isError: error });
  },
}));
