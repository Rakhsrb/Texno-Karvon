import { TeamateTypes } from "@/types/RootTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TeamateState {
  data: TeamateTypes[] | [];
  isPending: boolean;
  error: string;
}

const initialState: TeamateState = {
  data: [],
  isPending: false,
  error: "",
};

const TeamSlicer = createSlice({
  name: "Team",
  initialState,
  reducers: {
    setTeam(state, { payload }: PayloadAction<TeamateTypes[]>) {
      state.data = payload;
      state.isPending = false;
      state.error = "";
    },
    setTeamPending(state) {
      state.isPending = true;
    },
    setTeamError(state, { payload }: PayloadAction<string>) {
      state.error = payload;
      state.isPending = false;
    },
  },
});

export const { setTeam, setTeamError, setTeamPending } = TeamSlicer.actions;
export default TeamSlicer.reducer;
