"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: "Портфолио", url: "/portfolios" },
    { label: "О нас", url: "/about" },
    { label: "Сервисы", url: "/services" },
    { label: "Карьера", url: "/career" },
  ];

  return (
    <header className="sticky left-0 top-0 z-50 w-full backdrop-blur-md bg-[#171717]/90 border-b border-[#323232]">
      <div className="container border-l border-r border-[#323232] h-20 px-6 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 transition-transform hover:scale-105"
        >
          <Image
            src="/assets/star.svg"
            alt="Texno Karvon Logo"
            width={30}
            height={30}
            className="w-8 h-8 md:w-[30px] md:h-[30px] hover:animate-spin"
            priority
          />
          <span className="font-bold text-white text-lg md:text-xl">
            Texno Karvon<span className="text-[#E94D35]">.</span>
          </span>
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            {links.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.url}
                  className="relative text-white text-md font-medium transition-colors hover:text-[#E94D35] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-[#E94D35] after:transition-all hover:after:w-full"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="tel:+998900021462">
            <Button
              variant="default"
              className="hidden md:flex bg-[#E94D35] hover:bg-[#E94D35]/90 text-white font-medium px-6"
            >
              Связаться
            </Button>
          </Link>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Menu className="text-2xl text-white md:hidden" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-[#171717] border-l border-[#323232] p-0 h-full w-[300px] text-white"
            >
              <div className="flex flex-col">
                <div className="p-6 border-b border-[#323232]">
                  <div className="flex items-center justify-between">
                    <Link
                      href="/"
                      className="flex items-center gap-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <Image
                        src="/assets/star.svg"
                        alt="Texno Karvon Logo"
                        className="w-8 h-8 md:w-[30px] md:h-[30px] hover:animate-spin"
                        width={24}
                        height={24}
                        priority
                      />
                      <span className="font-bold text-white text-lg md:text-xl">
                        Texno Karvon<span className="text-[#E94D35]">.</span>
                      </span>
                    </Link>
                  </div>
                </div>
                <nav className="flex-1 p-6">
                  <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                  <ul className="flex flex-col gap-6">
                    {links.map((item, index) => (
                      <li key={index}>
                        <Link
                          href={item.url}
                          className="text-white text-lg font-medium hover:text-[#E94D35] transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="p-6 border-t border-[#323232]">
                  <Link href="tel:+998900021462">
                    <Button
                      className="w-full bg-[#E94D35] hover:bg-[#E94D35]/90 text-white font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      Связаться
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default Header;
