import { Fetch } from "@/middlewares/Fetch";
import { PortfolioTypes, TeamateTypes } from "@/types/RootTypes";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LinkIcon, Tag } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

function PortfolioDetail() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<PortfolioTypes | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [team, setTeam] = useState<TeamateTypes[] | []>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getPortfolioData() {
      setIsPending(true);
      try {
        const [portfolioResponse, teamResponse] = await Promise.all([
          Fetch.get(`portfolios/${id}`),
          Fetch.get("team"),
        ]);

        setData(portfolioResponse.data.data);
        setTeam(teamResponse.data.data);
      } catch (error: any) {
        setError(error.response?.data?.message || "An error occurred");
        console.error(error);
      } finally {
        setIsPending(false);
      }
    }

    getPortfolioData();
  }, [id]);

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-dotted border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl bg-red-800 p-4 rounded-lg shadow-md">
          {error}
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const handleAddAuthor = async (
    project: PortfolioTypes,
    author: TeamateTypes
  ) => {
    try {
      await Promise.all([
        Fetch.post(`portfolios/add-author`, { project, author }),
        Fetch.post(`team/add-portfolio`, { project, author }),
      ]);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveAuthor = async (
    project: PortfolioTypes,
    author: TeamateTypes
  ) => {
    try {
      await Promise.all([
        Fetch.post(`portfolios/remove-author`, { project, author }),
        Fetch.post(`team/remove-portfolio`, { project, author }),
      ]);

      setData((prevData) =>
        prevData
          ? {
              ...prevData,
              authors: prevData.authors.filter((au) => au._id !== author._id),
            }
          : null
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen overflow-y-auto text-gray-200 p-4">
      <div className="bg-[#202020] rounded-xl shadow-2xl overflow-hidden">
        <div className="relative h-96">
          <img
            src={data.photo}
            alt={data.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4">
              {data.title}
            </h1>
          </div>
        </div>
        <div className="p-6 md:p-10">
          <div className="flex flex-wrap items-center justify-between mb-6">
            <span className="bg-[#333533] text-gray-200 text-sm font-medium px-3 py-1 rounded-full">
              {data.category}
            </span>
            <div className="flex items-center text-gray-400">
              <span>{data.likeCount} Понравилось</span>
            </div>
          </div>
          <p className="text-gray-300 text-lg mb-8">{data.description}</p>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-100">Теги</h2>
            <div className="flex flex-wrap gap-2">
              {data.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-[#333533] text-gray-200 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  <Tag className="w-4 h-4 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-2xl font-semibold text-gray-100">Авторы</h2>
              <Sheet>
                <SheetTrigger>
                  <span className="bg-white text-black py-2 px-4 rounded-md">
                    Добавить автора
                  </span>
                </SheetTrigger>
                <SheetContent className="h-screen overflow-y-auto w-full sm:max-w-md sm:h-auto bg-[#202020] text-white border-none">
                  <SheetHeader>
                    <SheetTitle className="text-white">Новый автор</SheetTitle>
                    <SheetDescription>
                      Чтобы найти автора введите его (её) имя
                    </SheetDescription>
                  </SheetHeader>
                  <div className="flex flex-col gap-2 mt-6">
                    {team.map((teamate, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 rounded-md bg-[#333533]"
                      >
                        <div>
                          <div className="flex gap-2 items-center">
                            <img
                              src={teamate.photo}
                              alt=""
                              className="h-8 w-8"
                            />
                            <h1>{teamate.fullName}</h1>
                          </div>
                        </div>
                        <Button
                          variant={"outline"}
                          className="text-black"
                          onClick={() => handleAddAuthor(data, teamate)}
                        >
                          Добавить
                        </Button>
                      </div>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.authors.map((author, index) => (
                <div
                  key={index}
                  className="flex items-center bg-[#333533] justify-between rounded-lg p-4 gap-2"
                >
                  <div>
                    <p className="font-semibold text-gray-200">
                      {author.fullName}
                    </p>
                    <p className="text-sm text-gray-400">
                      {author.role || "Team Member"}
                    </p>
                  </div>
                  <div>
                    <Button
                      variant={"destructive"}
                      onClick={() => handleRemoveAuthor(data, author)}
                    >
                      Убрать
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <a
              href={`https://${data.link}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-bold inline-flex items-center underline"
            >
              <LinkIcon className="w-5 h-5 mr-2" />
              Посмотреть проект
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PortfolioDetail;
