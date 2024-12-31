import { useEffect } from "react";
import { RootState } from "../store/RootStore";
import { useDispatch, useSelector } from "react-redux";
import { Fetch } from "../middlewares/Fetch";
import { UserTypes } from "../types/RootTypes";
import {
  setAdmins,
  setAdminsError,
  setAdminsPending,
} from "../toolkit/AdminsSlicer";
import { Sheet } from "@/components/ui/sheet";
import { AddAdmin } from "@/modules/AddAdmin";

export default function Admins() {
  const { isPending, data, error } = useSelector(
    (state: RootState) => state.admins
  );
  const dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      try {
        dispatch(setAdminsPending());
        const response = (await Fetch.get("users")).data;
        if (response.data) {
          dispatch(setAdmins(response.data));
        } else {
          dispatch(setAdminsError(response.message));
        }
      } catch (error: any) {
        dispatch(
          setAdminsError(error.response?.data.message || "Unknown Token")
        );
      }
    }
    getData();
  }, [dispatch]);

  //   const handleDeleteAdmin = async (id: string) => {
  //     try {
  //       (await Axios.delete(`admins/${id}`)).data;
  //       dispatch(setAdmins(data.filter((admin) => admin._id !== id)));
  //       window.location.href = "/admins";
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4 gap-3 flex-wrap">
        <h1 className="text-2xl font-bold text-white">Admins</h1>
        <Sheet>
          <AddAdmin />
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
          <p className="text-lg font-medium text-gray-600">Admin yo'q</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.map((admin: UserTypes) => (
            <div
              key={admin._id}
              style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}
              className="bg-[#202020] rounded-lg p-4 flex flex-col gap-3"
            >
              <h2 className="text-lg font-semibold truncate text-white">
                {admin.fullName}
              </h2>
              <p className="text-gray-300 text-sm">{admin.phoneNumber}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
