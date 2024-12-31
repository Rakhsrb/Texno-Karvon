import { PortfolioTypes } from "@/types/RootTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PortfolioState {
  data: PortfolioTypes[] | [];
  isPending: boolean;
  error: string;
}

const initialState: PortfolioState = {
  data: [],
  isPending: false,
  error: "",
};

const PortfoliosSlicer = createSlice({
  name: "Portfolios",
  initialState,
  reducers: {
    setPortfolios(state, { payload }: PayloadAction<PortfolioTypes[]>) {
      state.data = payload;
      state.isPending = false;
      state.error = "";
    },
    setPortfoliosPending(state) {
      state.isPending = true;
    },
    setPortfoliosError(state, { payload }: PayloadAction<string>) {
      state.error = payload;
      state.isPending = false;
    },
  },
});

export const { setPortfolios, setPortfoliosError, setPortfoliosPending } =
  PortfoliosSlicer.actions;
export default PortfoliosSlicer.reducer;
