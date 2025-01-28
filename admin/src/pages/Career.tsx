import { Sheet } from "@/components/ui/sheet";
import { Fetch } from "@/middlewares/Fetch";
import { AddVacancy } from "@/modules/AddVacancy";
import { RootState } from "@/store/RootStore";
import {
  setVacancy,
  setVacancyError,
  setVacancyPending,
} from "@/toolkit/VacancySlicer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CareerTypes } from "@/types/RootTypes";

function Career() {
  const { isPending, data, error } = useSelector(
    (state: RootState) => state.vacancy
  );
  const dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      try {
        dispatch(setVacancyPending());
        const response = (await Fetch.get("career")).data;
        if (response.data) {
          dispatch(setVacancy(response.data));
        } else {
          dispatch(setVacancyError(response.message));
        }
      } catch (error: any) {
        dispatch(
          setVacancyError(error.response?.data.message || "Unknown Token")
        );
      }
    }
    getData();
  }, [dispatch]);

  const handleDeleteVacancy = async (id: string) => {
    if (confirm("Are you sure you want to delete this vacancy?")) {
      try {
        await Fetch.delete(`career/${id}`);
        dispatch(setVacancy(data.filter((teamate) => teamate._id !== id)));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="h-screen overflow-y-auto p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-white font-bold">Вакансии</h1>
        <Sheet>
          <AddVacancy />
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
          {data?.map((teamate: CareerTypes) => (
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
                    onClick={() => handleDeleteVacancy(teamate._id)}
                    className="flex items-center gap-2 text-red-600 cursor-pointer"
                  >
                    <Trash size={20} /> Удалить
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="p-4 space-y-2">
                <h2 className="text-lg font-semibold truncate text-white">
                  {teamate.name}
                </h2>
                <Badge className="bg-red-500">{teamate._id}</Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Career;
