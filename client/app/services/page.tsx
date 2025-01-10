import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Сервисы",
  description:
    "Мы представляем вам нашу команду талантливых специалистов, которые воплощают в жизнь самые смелые идеи. Каждый из них — профессионал своего дела, готовый создавать инновационные решения и двигать ваш проект к успеху.",
};

export default function Services() {
  const services = [
    {
      title: "Веб-сайты",
      description:
        "Ваш сайт — это лицо вашего бизнеса в интернете. Мы создаем современные и удобные решения.",
    },
    {
      title: "Мобильные приложения",
      description:
        "Создаем удобные и функциональные мобильные приложения для ваших задач.",
    },
    {
      title: "CRM-системы",
      description:
        "Оптимизируйте свои бизнес-процессы с помощью современных CRM-решений.",
    },
    {
      title: "Брендинг",
      description: "Создание уникального имиджа для вашего бренда.",
    },
    {
      title: "UI&UX",
      description: "Разработка удобных и привлекательных интерфейсов.",
    },
    {
      title: "Дата аналитика",
      description: "Анализ данных для бизнес-решений.",
    },
  ];

  return (
    <section className="border-b border-[#323232]">
      <div className="container border-l border-r border-[#323232] px-6 py-16">
        <h1 className="text-4xl font-bold mb-10 text-center text-white">
          Наши сервисы
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-8 bg-[#2A2A2A] rounded-lg hover:bg-[#323232] transition-colors duration-300"
            >
              <h2 className="text-white text-3xl font-bold mb-4">
                {service.title}
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
