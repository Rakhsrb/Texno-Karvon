import { configureStore } from "@reduxjs/toolkit";
import UserSlicer from "../toolkit/UserSlicer";
import PortfolioSlicer from "../toolkit/PortfolioSlicer";
import AdminsSlicerSlicer from "../toolkit/AdminsSlicer";
import TeamSlicer from "../toolkit/TeamSlicer";
import VacancySlicer from "../toolkit/VacancySlicer";

export const store = configureStore({
  reducer: {
    user: UserSlicer,
    portfolios: PortfolioSlicer,
    admins: AdminsSlicerSlicer,
    team: TeamSlicer,
    vacancy: VacancySlicer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
