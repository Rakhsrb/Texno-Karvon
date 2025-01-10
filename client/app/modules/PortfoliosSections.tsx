"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { usePortfolioStore } from "@/store/PortfolioStore";
import { Fetch } from "@/middlewares/Fetch";
import { PortfolioCard } from "@/components/shared/PortfolioCard";
import { Skeleton } from "@/components/ui/skeleton";

const categories = [
  {
    label: "Все",
    query: "",
  },
  {
    label: "Вебсайты",
    query: "website",
  },
  {
    label: "Приложение",
    query: "mobile",
  },
  {
    label: "CRM-системы",
    query: "crm",
  },
];

export default function PortfoliosSection() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const {
    data,
    isError,
    isPending,
    getPortfolioError,
    getPortfolioPending,
    getPortfolioSuccess,
  } = usePortfolioStore();

  useEffect(() => {
    const fetchData = async () => {
      getPortfolioPending();
      try {
        const response = (
          await Fetch(`portfolios?category=${selectedCategory}`)
        ).data;
        getPortfolioSuccess(response.data);
      } catch (error: any) {
        getPortfolioError(error.response.data);
      }
    };
    fetchData();
  }, [selectedCategory]);

  return (
    <section className="text-white border-b border-[#323232]">
      <div className="container h-full border-l border-r border-[#323232] py-20 px-6">
        <div className="mb-16 text-center">
          <span className="mb-2 inline-block text-[#E94D35]">
            <span className="animate-pulse text-2xl">✴</span>
          </span>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Портфолио
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Мы представляем вам нашу команду талантливых специалистов, которые
            воплощают в жизнь самые смелые идеи. Каждый из них — профессионал
            своего дела, готовый создавать инновационные решения и двигать ваш
            проект к успеху.
          </p>
        </div>
        <div className="text-center space-y-12">
          <div className="flex flex-wrap gap-2 md:gap-6">
            {categories.map((category, index) => (
              <Button
                key={index}
                onClick={() => setSelectedCategory(category.query)}
                variant={
                  selectedCategory === category.query ? "default" : "outline"
                }
                className={`
                  px-4 md:px-8 py-3 md:py-6 md:text-lg capitalize
                  ${
                    selectedCategory === category.query
                      ? "bg-[#E94D35] hover:bg-[#E94D35]/90 text-white"
                      : "border-[#323232] text-white bg-[#323232]"
                  }
                `}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {isPending ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-[#3e3e3e] rounded-lg overflow-hidden shadow-lg"
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
            ))}{" "}
          </div>
        ) : data.length <= 0 ? (
          <div className="flex items-center justify-center w-full text-center h-[20vh]">
            <h1 className="font-bold opacity-70">Пока что нет портфолио</h1>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
            {data.map((template) => (
              <PortfolioCard key={template._id} {...template} />
            ))}{" "}
          </div>
        )}
      </div>
    </section>
  );
}
