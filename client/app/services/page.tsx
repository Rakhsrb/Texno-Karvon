import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Сервисы",
  description:
    "Мы представляем вам нашу команду талантливых специалистов, которые воплощают в жизнь самые смелые идеи. Каждый из них — профессионал своего дела, готовый создавать инновационные решения и двигать ваш проект к успеху.",
};

export default function ServicesSection() {
  const services = [
    {
      title: "Веб-сайты",
      description:
        "Мы разрабатываем веб-сайты с высоким качеством, от корпоративных сайтов до много-функциональных платформ.",
    },
    {
      title: "Мобильные приложения",
      description:
        "Разработка и техническая поддержка мобильных приложений любой сложности",
    },
    {
      title: "CRM-Системы",
      description:
        "Автоматизация процессов и улучшение взаимодействия с клиентами.",
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
