import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/shared/Header";
import { Footer } from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "Техно Карвон",
  description:
    "Техно Карвон — это команда, которая разрабатывает IT-решения. Мы создаём веб-сайты, мобильные приложения и CRM-системы с профессиональным подходом. Наша цель — автоматизировать, улучшать и делать бизнес-процессы наших клиентов более удобными. Благодаря инновационному подходу и передовым технологиям мы гарантируем высокое качество для каждого проекта.С Техно Карвон вы выведете свой бизнес на новый уровень!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./assets/star.svg" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
