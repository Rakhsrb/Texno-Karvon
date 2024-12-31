import { useEffect } from "react";
import { RootState } from "../store/RootStore";
import { useDispatch, useSelector } from "react-redux";
import {
  setPortfolios,
  setPortfoliosError,
  setPortfoliosPending,
} from "../toolkit/PortfolioSlicer";
import { Fetch } from "../middlewares/Fetch";
import { Sheet } from "@/components/ui/sheet";
import { AddPortfolio } from "@/modules/AddPortfolio";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Portfolios = () => {
  const { isPending, data, error } = useSelector(
    (state: RootState) => state.portfolios
  );

  const dispatch = useDispatch();

  useEffect(() => {
    async function getMyData() {
      try {
        dispatch(setPortfoliosPending());
        const response = (await Fetch.get("portfolios")).data;
        if (response.data) {
          dispatch(setPortfolios(response.data));
        } else {
          dispatch(setPortfoliosError(response.message));
        }
      } catch (error: any) {
        dispatch(
          setPortfoliosError(error.response?.data.message || "Unknown Token")
        );
      }
    }
    getMyData();
  }, [dispatch]);

  // const handleDeleteProduct = async (id: string) => {
  //   if (confirm("Haqiqatan o'chirishni xohlaysizmi?")) {
  //     try {
  //       (await Fetch.delete(products/${id})).data;
  //       dispatch(setPortfolios(data.filter((product) => product._id !== id)));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4 gap-3 flex-wrap">
        <h1 className="text-2xl font-bold text-white">Portfolios</h1>
        <Sheet>
          <AddPortfolio />
        </Sheet>
      </div>

      {isPending ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse overflow-hidden bg-[#202020]"
            >
              <div className="h-48 bg-zinc-700"></div>
              <div className="p-4">
                <div className="h-4 bg-zinc-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-zinc-700 rounded w-1/2"></div>
              </div>
              <div className="p-4 border-t border-zinc-800 bg-[#202020]">
                <div className="h-4 bg-zinc-700 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-lg font-medium text-red-600">{error}</p>
        </div>
      ) : data.length <= 0 ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-lg font-medium text-gray-300">No data</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((template) => (
            <Card key={template._id} className="border-none">
              <CardContent className="bg-[#202020] p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={template.photo}
                    alt={template.title}
                    className="object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="p-2">
                  <a
                    href={`https://${template.link}`}
                    target="_blank"
                    className="text-xl font-semibold text-white mb-2"
                  >
                    {template.title}
                  </a>
                  <p className="text-zinc-400 text-sm mb-4">
                    {template.description}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="p-4 flex items-center justify-between border-t border-zinc-800 bg-[#202020]">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-zinc-400">
                    {template.category}
                  </span>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-zinc-800 text-zinc-300"
                >
                  Liked: {template.likeCount}
                </Badge>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Portfolios;
