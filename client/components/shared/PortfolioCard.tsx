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
        <p className="text-gray-400 text-sm line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          {authors.length <= 1 ? (
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src={authors[0]?.photo} />
                <AvatarFallback>{authors[0].fullName.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-400">
                {authors[0]?.fullName}
              </span>
            </div>
          ) : (
            <HoverCard>
              <HoverCardTrigger>Авторы</HoverCardTrigger>
              <HoverCardContent>
                The React Framework – created and maintained by @vercel.
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
