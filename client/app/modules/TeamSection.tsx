"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TeamateTypes } from "@/types/RootTypes";

const templates: TeamateTypes[] = [
  {
    _id: "1",
    fullName: "Камилов Владимир",
    biography:
      "Free, customizable and production-ready template for Astro using Tailwind CSS.",
    photo:
      "https://images.ctfassets.net/lh3zuq09vnm2/yBDals8aU8RWtb0xLnPkI/19b391bda8f43e16e64d40b55561e5cd/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.png",
    role: "Специаллист по AI",
    skills: ["Next.js", "Nodejs"],
  },
  {
    _id: "2",
    fullName: "Алексей Никулин",
    biography:
      "Free, customizable and production-ready template for Astro using Tailwind CSS.",
    photo:
      "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2484",
    role: "Программист",
    skills: ["Next.js", "Nodejs"],
  },
  {
    _id: "3",
    fullName: "Jamal Ikram",
    biography:
      "Free, customizable and production-ready template for Astro using Tailwind CSS.",
    photo:
      "https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    role: "Дизайнер",
    skills: ["Next.js", "Nodejs", "typescript"],
  },
];

export default function TeamSection() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="relative text-white border-b border-[#323232]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#E94D35]/10 via-transparent to-transparent" />
      <div className="container relative h-full border-l border-r border-[#323232] py-20">
        <div className="mb-16 text-center px-4">
          <span className="mb-2 inline-block text-[#E94D35]">
            <span className="animate-pulse text-2xl">✴</span>
          </span>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Команда
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Познакомьтесь с нашей командой профессионалов, которые делают
            невозможное возможным
          </p>
        </div>

        <div className="px-16">
          <Slider {...settings} className="team-slider">
            {templates.map((template) => (
              <div key={template._id} className="px-3">
                <Card className="group overflow-hidden border-none bg-black/40 backdrop-blur-sm transition-all">
                  <CardContent className="p-0">
                    <div className="relative aspect-[4/5]">
                      <Image
                        src={template.photo}
                        alt={template.fullName}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-90" />
                      <div className="absolute inset-x-0 bottom-0 p-6">
                        <h3 className="mb-2 text-2xl font-bold text-white">
                          {template.fullName}
                        </h3>
                        <Badge
                          variant="secondary"
                          className="mb-4 bg-[#E94D35] text-white hover:bg-[#E94D35]/90"
                        >
                          {template.role}
                        </Badge>
                        <p className="mb-6 line-clamp-2 text-sm text-gray-300">
                          {template.biography}
                        </p>
                        <div className="mb-4 flex flex-wrap gap-2">
                          {template.skills.map((skill) => (
                            <Badge
                              key={skill}
                              variant="outline"
                              className="border-[#323232] bg-black/50 text-white backdrop-blur-sm"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <Button className="w-full bg-[#E94D35] text-white transition-colors hover:bg-[#E94D35]/90">
                          Узнать больше
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
