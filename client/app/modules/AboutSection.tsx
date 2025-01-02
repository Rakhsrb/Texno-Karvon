"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Globe, Smartphone, Database } from "lucide-react";

const services = [
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Создании веб-сайтов",
    description: "Современный дизайн и удобство использования.",
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Разработке мобильных приложений",
    description: "Удобные и функциональные решения для iOS и Android.",
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "CRM-системах",
    description:
      "Автоматизация процессов и улучшение взаимодействия с клиентами.",
  },
];

function AboutSection() {
  return (
    <section className="border-b border-[#323232]">
      <div className="container h-full border-l border-r border-[#323232] px-6 py-20">
        <h1 className="text-center text-4xl font-bold text-white">
          <span className="text-[#E94D35]">✴</span> О нас
        </h1>
        <div className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            <div className="space-y-6 text-gray-300">
              <p className="text-lg">
                Наша IT-группа была основана в ноябре 2024 года Сухробом
                Рахматуллаевым. Несмотря на небольшой размер команды, мы с
                гордостью разрабатываем качественные и инновационные решения в
                области технологий.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-white text-xl font-semibold">
                Мы специализируемся на:
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="space-y-4"
                  >
                    <div className="w-12 h-12 rounded-lg bg-[#E94D35]/10 flex items-center justify-center text-[#E94D35]">
                      {service.icon}
                    </div>
                    <h4 className="text-white font-medium">{service.title}</h4>
                    <p className="text-gray-400 text-sm">
                      {service.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="space-y-6"
            >
              <div className="h-[2px] bg-[#323232]" />
              <p className="text-gray-300 text-lg">
                Наша миссия — помочь бизнесам расти, создавая эффективные и
                технологически продвинутые продукты.
              </p>
              <p className="text-[#E94D35] font-medium">
                Свяжитесь с нами, чтобы начать ваш проект вместе с нами!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
