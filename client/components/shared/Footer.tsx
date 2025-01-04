"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Send,
  Phone,
  Mail,
  ArrowUp,
} from "lucide-react";

const positions = [
  "Strong Junior QA инженер по тестированию ПО",
  "Middle Frontend разработчик (React.js & Next.JS)",
  "Middle Backend инженер-программист (Java, Nodejs)",
  "Middle UI/UX дизайнер",
  "Опытный DevOps специаллист",
];

const navigation = [
  { label: "Портфолио", url: "/portfolios" },
  { label: "О нас", url: "/about" },
  { label: "Сервисы", url: "/services" },
  { label: "Контакты", url: "/contacts" },
];
const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/texnokarvon",
  },
  { name: "Telegram", icon: Send, href: "https://t.me/texnokarvon" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="text-white">
      <div className="container border-l border-r border-[#323232] p-6">
        <div className="mb-12 grid gap-8 rounded-xl bg-[#2A2A2A] p-8 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-4xl font-bold">
              Вы тоже можете быть частью этой команды :)
            </h2>
            <p className="text-gray-400">
              Хотите развиваться вместе с нами? Тогда докажите нам, что вы этого
              достойны! Станьте неотъемлемой частью нашей команды.
            </p>
          </div>
          <div className="space-y-3">
            {positions.map((position) => (
              <div
                key={position}
                className="flex items-center space-x-2 text-gray-300"
              >
                <div className="h-px w-4 bg-[#E94D35]" />
                <span>{position}</span>
              </div>
            ))}
          </div>
        </div>

        <nav className="mb-8">
          <ul className="flex flex-wrap justify-center gap-6">
            {navigation.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.url}
                  className="text-sm hover:text-[#E94D35] transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mb-8 flex flex-wrap justify-center gap-4">
          {socialLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              target="_blank"
              aria-label={item.name}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#323232] transition-colors hover:border-[#E94D35] hover:text-[#E94D35]"
            >
              <item.icon className="h-5 w-5" />
            </Link>
          ))}
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-6 text-sm text-[#818181]">
          <Link
            href="#"
            className="flex items-center gap-2 hover:text-[#E94D35]"
          >
            <Mail className="h-4 w-4" />
            texnokarvongroup@gmail.com
          </Link>
          <Link
            href="tel:+998900021462"
            className="flex items-center gap-2 hover:text-[#E94D35]"
          >
            <Phone className="h-4 w-4" />
            +998 90 002 14 62
          </Link>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-[#323232] pt-8 md:flex-row">
          <p className="text-sm text-[#818181]">
            © TexnoKarvon {new Date().getFullYear()} Все права защищены.
          </p>

          <ArrowUp
            className="h-8 w-8 p-1 rounded-full border hover:border-[#E94D35] hover:text-[#E94D35] transition-all"
            onClick={scrollToTop}
          />
        </div>
      </div>
    </footer>
  );
}
