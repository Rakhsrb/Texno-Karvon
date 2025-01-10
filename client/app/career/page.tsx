import { Suspense } from "react";
import { Fetch } from "@/middlewares/Fetch";
import { CareerTypes } from "@/types/RootTypes";
import { Metadata } from "next";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Banknote, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Карьера",
  description:
    "Мы стремимся привлечь талантливых и амбициозных профессионалов, которые готовы расти и развиваться в динамичной и поддерживающей рабочей среде. В нашей компании вы найдете возможности для карьерного роста, обучения и реализации своих идей. Мы ценим инициативность, командную работу и стремление к совершенству.",
};

async function CaarerGrid() {
  try {
    const response = (await Fetch("career")).data;

    const data: CareerTypes[] = response.data;

    if (data?.length === 0) {
      return (
        <div className="h-full flex items-center justify-center">
          <h2 className="text-2xl font-semibold text-gray-400">
            Пока что нет вакансии.
          </h2>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((job, index) => (
          <Card key={index} className="bg-[#323232] border-none">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-white leading-tight">
                {job.name}
              </h3>
              <div className="flex justify-between">
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">Понедельник - Пятница</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock className="h-4 w-4 ml-2" />
                  <span className="text-sm">09:00 - 18:00</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Banknote className="text-red-500" />
                  <span className="text-white font-medium">
                    {job.salary.from.toLocaleString() +
                      " - " +
                      job.salary.to.toLocaleString()}{" "}
                    Сум
                  </span>
                </div>
                <Button size="icon" className="bg-red-500 hover:bg-red-600">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error fetching portfolios:", error);
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold text-red-500">
          Ошибка при загрузке вакансии
        </h2>
        <p className="mt-2 text-gray-400">Пожалуйста, попробуйте позже</p>
      </div>
    );
  }
}

export default function Vacancy() {
  const list = [
    {
      title: "Карьерный рост",
      description:
        "Мы предоставляем возможности для развития и роста на разных уровнях в нашей компании.",
    },
    {
      title: "Обучение и поддержка",
      description:
        "Мы верим в важность постоянного обучения, поэтому регулярно проводим тренинги, семинары и мастер-классы.",
    },
    {
      title: "Дружелюбная атмосфера",
      description:
        "У нас царит атмосфера взаимного уважения и поддержки, где каждый сотрудник может выразить себя и внести свой вклад.",
    },
    {
      title: "Интересные проекты",
      description:
        "Мы работаем над инновационными проектами, которые дают возможность применять и развивать свои навыки.",
    },
    {
      title: "Гибкость и баланс",
      description:
        "Мы предлагаем гибкие условия работы, чтобы обеспечить баланс между личной жизнью и профессиональными обязанностями.",
    },
  ];
  return (
    <>
      <section className="text-white border-b border-[#323232]">
        <div className="container border-l border-r border-[#323232] py-20 px-6">
          <h1 className="text-4xl font-bold mb-10 text-white">
            Карьера в нашей компании
          </h1>
          <p className="text-gray-400 pb-5 border-b border-[#323232]">
            Мы стремимся привлечь талантливых и амбициозных профессионалов,
            которые готовы расти и развиваться в динамичной и поддерживающей
            рабочей среде. В нашей компании вы найдете возможности для
            карьерного роста, обучения и реализации своих идей. Мы ценим
            инициативность, командную работу и стремление к совершенству
          </p>
          <h2 className="text-white pt-5">Почему стоит работать с нами?</h2>
          <ul className="p-5">
            {list.map((vacancy, index) => (
              <li key={index} className="list-disc text-sm text-white mb-3">
                <p>
                  <span className="font-bold">{vacancy.title}: </span>
                  {vacancy.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section>
        <div className="container border-l border-r border-[#323232] py-20 px-6">
          <div className="flex flex-col justify-center text-center mx-auto max-w-2xl mb-10">
            <h1 className="text-2xl font-bold mb-5 text-white">
              Открытые вакансии
            </h1>
            <p className="text-gray-400">
              Здесь вы можете найти актуальные вакансии и подать заявку на ту,
              которая соответствует вашим навыкам и интересам. Мы всегда рады
              новым талантам, которые помогут нам двигаться вперед.
            </p>
          </div>
          <Suspense fallback={<CareerSkeleton />}>
            <CaarerGrid />
          </Suspense>
        </div>
      </section>
    </>
  );
}

function CareerSkeleton() {
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
