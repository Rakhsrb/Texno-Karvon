import { Sheet } from "@/components/ui/sheet";
import { Fetch } from "@/middlewares/Fetch";
import { AddVacancy } from "@/modules/AddVacancy";
import { useEffect } from "react";

function Career() {
  useEffect(() => {
    async function getData() {
      try {
        const response = (await Fetch.get("career")).data;
        console.log(response);
      } catch (error: any) {
        console.log(error);
      }
    }
    getData();
  }, []);

  return (
    <div className="h-screen overflow-y-auto p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-white font-bold">Вакансии</h1>
        <Sheet>
          <AddVacancy />
        </Sheet>
      </div>
    </div>
  );
}

export default Career;
