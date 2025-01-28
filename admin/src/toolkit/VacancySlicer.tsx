import { CareerTypes } from "@/types/RootTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VacancyState {
  data: CareerTypes[] | [];
  isPending: boolean;
  error: string;
}

const initialState: VacancyState = {
  data: [],
  isPending: false,
  error: "",
};

const VacancySlicer = createSlice({
  name: "Vacancy",
  initialState,
  reducers: {
    setVacancy(state, { payload }: PayloadAction<CareerTypes[]>) {
      state.data = payload;
      state.isPending = false;
      state.error = "";
    },
    setVacancyPending(state) {
      state.isPending = true;
    },
    setVacancyError(state, { payload }: PayloadAction<string>) {
      state.error = payload;
      state.isPending = false;
    },
  },
});

export const { setVacancy, setVacancyError, setVacancyPending } =
  VacancySlicer.actions;
export default VacancySlicer.reducer;
