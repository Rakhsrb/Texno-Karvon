import { Suspense } from "react";

import { Fetch } from "@/middlewares/Fetch";
import { PortfolioTypes } from "@/types/RootTypes";
import { Metadata } from "next";
import { Skeleton } from "@/components/ui/skeleton";
import { PortfolioCard } from "@/components/shared/PortfolioCard";

export const metadata: Metadata = {
  title: "Портфолио",
  description:
    "Мы представляем вам нашу команду талантливых специалистов, которые воплощают в жизнь самые смелые идеи. Каждый из них — профессионал своего дела, готовый создавать инновационные решения и двигать ваш проект к успеху.",
};

async function PortfolioGrid() {
  try {
    const response = (await Fetch("portfolios")).data;
    const data: PortfolioTypes[] = response.data;

    if (data.length === 0) {
      return (
        <div className="h-full flex items-center justify-center">
          <h2 className="text-2xl font-semibold text-gray-400">
            Пока что нет Портфолио.
          </h2>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((template) => (
          <PortfolioCard key={template._id} {...template} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error fetching portfolios:", error);
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold text-red-500">
          Ошибка при загрузке портфолио
        </h2>
        <p className="mt-2 text-gray-400">Пожалуйста, попробуйте позже</p>
      </div>
    );
  }
}

export default function Portfolios() {
  return (
    <section className="text-white border-b border-[#323232]">
      <div className="container min-h-[50vh] border-l border-r border-[#323232] py-20 px-6">
        <h1 className="text-4xl font-bold mb-10 text-center">Наше Портфолио</h1>
        <Suspense fallback={<PortfolioSkeleton />}>
          <PortfolioGrid />
        </Suspense>
      </div>
    </section>
  );
}

function PortfolioSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-[#323232] rounded-lg overflow-hidden shadow-lg"
        >
          <Skeleton className="aspect-video w-full" />
          <div className="p-6 space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
