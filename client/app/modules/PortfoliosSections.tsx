"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface Template {
  id: string;
  title: string;
  description: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
}

const templates: Template[] = [
  {
    id: "1",
    title: "AstroWind",
    description:
      "Free, customizable and production-ready template for Astro using Tailwind CSS.",
    image:
      "https://uic.group/media/cache/b9/d1/b9d166491e56e143b4bc2995bc3b0f92.jpg",
    author: {
      name: "onwidget",
      avatar:
        "https://images.ctfassets.net/lh3zuq09vnm2/yBDals8aU8RWtb0xLnPkI/19b391bda8f43e16e64d40b55561e5cd/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.png",
    },
    category: "website",
  },
  {
    id: "2",
    title: "Bento-like Portfolio",
    description:
      "Astro-bento-portfolio is a minimal bento-like (almost) single page portfolio website made in Astro",
    image:
      "https://uic.group/media/cache/7b/86/7b86bdb9ed6fe67db522c1f2af926500.jpg",
    author: {
      name: "Ladvace",
      avatar:
        "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2484",
    },
    category: "mobile",
  },
  {
    id: "3",
    title: "Dante",
    description:
      "A uncluttered minimal Astro.js + Tailwind CSS theme designed for those who appreciate clarity and minimalism.",
    image:
      "https://uic.group/media/cache/75/b9/75b96f58368bc1c86a619e47c3fa3d0c.jpg",
    author: {
      name: "Asta Bankauske",
      avatar:
        "https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    category: "crm",
  },
];

const categories = ["all", "website", "mobile", "crm"];

export default function PortfoliosSection() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredTemplates = templates.filter((template) => {
    if (selectedCategory === "all") return true;
    return template.category === selectedCategory;
  });

  return (
    <div className="h-screen text-white border-b border-[#323232]">
      <div className="container h-full border-l border-r border-[#323232] py-20 px-6">
        <div className="text-center space-y-12">
          <h1 className="text-4xl font-bold text-white">
            <span className="text-[#E94D35]">✴</span> Портфолио
          </h1>

          <div className="flex flex-wrap gap-6">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`
                  px-8 py-6 text-lg capitalize
                  ${
                    selectedCategory === category
                      ? "bg-[#E94D35] hover:bg-[#E94D35]/90 text-white"
                      : "border-[#323232] text-white bg-[#323232]"
                  }
                `}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6"
        >
          {filteredTemplates.map((template) => (
            <motion.div
              layout
              key={template.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-[#323232] rounded-lg overflow-hidden group hover:ring-2 hover:ring-[#E94D35] transition-all"
            >
              <div className="relative aspect-video">
                <Image
                  src={template.image}
                  alt={template.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button className="bg-[#E94D35] hover:bg-[#E94D35]/90">
                    View Project
                  </Button>
                </div>
              </div>
              <div className="p-4 space-y-4">
                <h3 className="text-xl font-semibold">{template.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-2">
                  {template.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="relative w-6 h-6 rounded-full overflow-hidden">
                      <Image
                        src={template.author.avatar}
                        alt={template.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm text-gray-400">
                      {template.author.name}
                    </span>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium bg-[#2A2F38] rounded">
                    {template.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
