import { Fetch } from "@/middlewares/Fetch";
import { RootState } from "@/store/RootStore";
import { useEffect } from "react";
import { setTeam, setTeamError, setTeamPending } from "@/toolkit/TeamSlicer";
import { useDispatch, useSelector } from "react-redux";
import { TeamateTypes } from "@/types/RootTypes";
import { AddTeamate } from "@/modules/AddTeamate";
import { Sheet } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

  const handleDeleteTeam = async (id: string) => {
    if (confirm("Are you sure you want to delete this portfolio?")) {
      try {
        await Fetch.delete(`team/${id}`);
        dispatch(setTeam(data.filter((teamate) => teamate._id !== id)));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="p-4 h-screen overflow-y-auto">
      <div className="flex justify-between items-center mb-4 gap-3 flex-wrap">
        <h1 className="text-2xl font-bold text-white">Команда</h1>
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
          <p className="text-lg font-medium text-gray-300">
            Нет ни одного сотрудника
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {data?.map((teamate: TeamateTypes) => (
            <div
              key={teamate._id}
              className="bg-[#202020] rounded-lg overflow-hidden relative"
            >
              <DropdownMenu>
                <DropdownMenuTrigger className="absolute top-2 right-2">
                  <EllipsisVertical size={24} className="text-zinc-400" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="border-none">
                  <DropdownMenuItem
                    onClick={() => handleDeleteTeam(teamate._id)}
                    className="flex items-center gap-2 text-red-600 cursor-pointer"
                  >
                    <Trash size={20} /> Удалить
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <img
                className="h-[300px] object-cover w-full"
                src={teamate.photo}
                alt={teamate.fullName}
              />
              <div className="p-4 space-y-2">
                <h2 className="text-lg font-semibold truncate text-white">
                  {teamate.fullName}
                </h2>
                <Badge className="bg-red-500">{teamate.role}</Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Team;
