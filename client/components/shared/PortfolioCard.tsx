import React from "react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { PortfolioTypes } from "@/types/RootTypes";

export const PortfolioCard = ({
  authors,
  category,
  description,
  photo,
  title,
}: PortfolioTypes) => {
  return (
    <div className="bg-[#323232] rounded-lg overflow-hidden group hover:ring-2 hover:ring-[#E94D35] transition-all">
      <div className="relative aspect-video">
        <Image src={photo} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 backdrop-blur-sm transition-opacity flex items-center justify-center">
          <Link href={`/portfolios/${title}`}>
            <Button className="bg-[#E94D35] hover:bg-[#E94D35]/90">
              Подробнее
            </Button>
          </Link>
        </div>
      </div>
      <div className="p-4 space-y-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-400 text-sm line-clamp-2 truncate">
          {description}
        </p>
        <div className="flex items-center justify-between">
          {authors.length <= 0 ? (
            <span className="text-[12px] font-semibold opacity-80">
              Нет автора
            </span>
          ) : authors.length <= 1 ? (
            <div className="flex items-center space-x-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src={authors[0]?.photo} />
                <AvatarFallback>{authors[0].fullName.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-400">
                {authors[0]?.fullName}
              </span>
            </div>
          ) : (
            <HoverCard>
              <HoverCardTrigger>
                <div className="flex items-center gap-1">
                  <span className="text-sm">Авторы: {authors.length}+</span>
                  <div className="flex gap-1">
                    {authors.map((author, index) => (
                      <img
                        key={index}
                        src={author.photo}
                        alt={author.fullName}
                        className="rounded-full object-cover w-4 h-4"
                      />
                    ))}
                  </div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="bg-[#323232] border-none p-0 overflow-hidden">
                <div className="flex flex-col gap-2">
                  {authors.map((author, index) => (
                    <div
                      key={index}
                      className="flex gap-2 items-center hover:bg-[#4c4c4c] p-2"
                    >
                      <img
                        src={author.photo}
                        alt={author.fullName}
                        className="rounded-full object-cover w-8 h-8"
                      />
                      <div>
                        <h3 className="text-white">{author.fullName}</h3>
                        <h4 className="text-gray-400">{author.role}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </HoverCardContent>
            </HoverCard>
          )}
          <span className="px-2 py-1 text-xs font-medium bg-[#E94D35] rounded">
            {category}
          </span>
        </div>
      </div>
    </div>
  );
};
