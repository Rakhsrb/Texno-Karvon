import { Fetch } from "@/middlewares/Fetch";
import { RootState } from "@/store/RootStore";
import { useEffect } from "react";
import { setTeam, setTeamError, setTeamPending } from "@/toolkit/TeamSlicer";
import { useDispatch, useSelector } from "react-redux";
import { TeamateTypes } from "@/types/RootTypes";
import { AddTeamate } from "@/modules/AddTeamate";
import { Sheet } from "@/components/ui/sheet";

function Team() {
  const { isPending, data, error } = useSelector(
    (state: RootState) => state.team
  );
  const dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      try {
        dispatch(setTeamPending());
        const response = (await Fetch.get("team")).data;
        if (response.data) {
          dispatch(setTeam(response.data));
        } else {
          dispatch(setTeamError(response.message));
        }
      } catch (error: any) {
        dispatch(setTeamError(error.response?.data.message || "Unknown Token"));
      }
    }
    getData();
  }, [dispatch]);
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4 gap-3 flex-wrap">
        <h1 className="text-2xl font-bold text-white">Team</h1>
        <Sheet>
          <AddTeamate />
        </Sheet>
      </div>

      {isPending ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}
              className="animate-pulse bg-[#202020] rounded-lg p-4 flex flex-col gap-3"
            >
              <div className="h-6 bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : error && error ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-lg font-medium text-red-600">{error}</p>
        </div>
      ) : data.length <= 0 ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-lg font-medium text-gray-300">No one in team</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.map((teamate: TeamateTypes) => (
            <div
              key={teamate._id}
              style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}
              className="bg-[#202020] rounded-lg p-4 flex flex-col gap-3"
            >
              <img src={teamate.photo} alt={teamate.fullName} />
              <h2 className="text-lg font-semibold truncate text-white">
                {teamate.fullName}
              </h2>
              <p className="text-gray-300 text-sm">{teamate.role}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Team;
