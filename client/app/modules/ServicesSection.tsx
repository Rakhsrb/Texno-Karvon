"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Service {
  id: number;
  title: string;
  shortDescription: string;
  longDescription: string;
}

const services: Service[] = [
  {
    id: 1,
    title: "Веб-сайты",
    shortDescription:
      "Ваш сайт — это лицо вашего бизнеса в интернете. Мы создаем современные и удобные решения.",
    longDescription:
      "Мы разрабатываем привлекательные и удобные веб-сайты, которые адаптированы под мобильные устройства. Каждый проект создается с учетом уникальных требований клиента. Перед началом работы мы изучаем вашу целевую аудиторию, философию проекта и ваши цели.",
  },
  {
    id: 2,
    title: "Мобильные приложения",
    shortDescription:
      "Создаем удобные и функциональные мобильные приложения для ваших задач.",
    longDescription:
      "Мы разрабатываем мобильные приложения для iOS и Android, которые помогают вашему бизнесу расти. Современные интерфейсы, высокая производительность и интеграция с необходимыми сервисами — все это мы воплощаем в ваших проектах.",
  },
  {
    id: 3,
    title: "CRM-системы",
    shortDescription:
      "Оптимизируйте свои бизнес-процессы с помощью современных CRM-решений.",
    longDescription:
      "Мы создаем кастомизированные CRM-системы для вашего бизнеса. Эти решения помогают управлять клиентскими данными, улучшать взаимодействие с клиентами и автоматизировать процессы, повышая эффективность вашего бизнеса.",
  },
  {
    id: 4,
    title: "Брендинг",
    shortDescription: "Создание уникального имиджа для вашего бренда.",
    longDescription:
      "Брендинг включает разработку стратегии, визуального стиля и коммуникации, чтобы выделить ваш бренд на рынке и создать прочную связь с клиентами.",
  },
  {
    id: 5,
    title: "UI&UX",
    shortDescription: "Разработка удобных и привлекательных интерфейсов.",
    longDescription:
      "UI&UX-дизайн охватывает создание пользовательского интерфейса и улучшение опыта взаимодействия с продуктом, обеспечивая простоту использования и эстетическую привлекательность.",
  },
  {
    id: 6,
    title: "Дата аналитика",
    shortDescription: "Анализ данных для бизнес-решений.",
    longDescription:
      "Дата аналитика помогает извлекать ценную информацию из данных, улучшая процессы принятия решений, оптимизацию стратегий и прогнозирование будущих тенденций.",
  },
];

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<Service>(services[0]);

  return (
    <section className="border-b border-[#323232]">
      <div className="container h-full border-l border-r border-[#323232] px-6 py-20">
        <div className="mb-16 text-center">
          <span className="mb-2 inline-block text-[#E94D35]">
            <span className="animate-pulse text-2xl">✴</span>
          </span>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl text-white">
            Наши сервисы
          </h1>
        </div>

        <div className="mt-20 grid lg:grid-cols-2 gap-12 lg:gap-24 text-white">
          <div className="space-y-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="border-b border-[#323232] pb-6 last:border-0"
              >
                <button
                  onClick={() => setSelectedService(service)}
                  className={`text-left w-full group flex items-center justify-between ${
                    selectedService.id === service.id
                      ? "text-[#E94D35]"
                      : "text-white"
                  }`}
                >
                  <span className="text-2xl font-medium group-hover:text-[#E94D35] transition-colors">
                    {service.title}
                  </span>
                  <span
                    className={`transform transition-transform ${
                      selectedService.id === service.id ? "rotate-180" : ""
                    }`}
                  >
                    →
                  </span>
                </button>
              </div>
            ))}
          </div>

          <div className="lg:sticky lg:top-24 h-fit">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedService.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h1 className="text-xl md:text-3xl">
                  {selectedService.shortDescription}
                </h1>
                <h2 className="text-gray-400">
                  {selectedService.longDescription}
                </h2>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
