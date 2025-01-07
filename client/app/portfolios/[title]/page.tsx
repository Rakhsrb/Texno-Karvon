import { Suspense } from "react";
import { PortfolioTypes } from "@/types/RootTypes";
import { Metadata } from "next";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, LinkIcon, ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: { title: string };
}): Promise<Metadata> {
  const { title } = await params;
  return {
    title: `Портфолио | ${decodeURIComponent(title)}`,
  };
}

async function PortfolioContent({ title }: { title: string }) {
  try {
    const response = await fetch(
      `http://localhost:3000/portfolios?title=${encodeURIComponent(title)}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch portfolio data");
    }

    const malumot = await response.json();
    const template: PortfolioTypes = malumot.data[0];

    return (
      <div className="max-w-5xl mx-auto px-4 space-y-8">
        <div className="flex justify-between items-center">
          <Link
            href="/portfolios"
            className="flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад к портфолио
          </Link>
          <Button variant="outline" size="icon">
            <Heart className="h-4 w-4 text-red-500" />
          </Button>
        </div>

        <div className="space-y-6">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <h1 className="text-4xl md:text-6xl font-bold">{template.title}</h1>
            <div className="flex flex-wrap gap-2">
              {template.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="aspect-video relative rounded-lg overflow-hidden">
            <Image
              src={template.photo}
              alt={template.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <p className="text-gray-400 text-lg leading-relaxed">
            {template.description}
          </p>

          <div className="border-t border-[#323232] pt-6">
            <h2 className="text-xl font-semibold mb-4">Авторы проекта</h2>
            <div className="flex flex-wrap gap-4">
              {template.authors.map((author) => (
                <div
                  key={author._id}
                  className="flex items-center space-x-3 bg-[#323232] p-2 rounded-lg"
                >
                  <Avatar>
                    <AvatarImage src={author.photo} />
                    <AvatarFallback>{author.fullName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{author.fullName}</p>
                    <p className="text-sm text-gray-400">{author.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {template.link && (
            <div className="flex justify-center">
              <Button asChild className="bg-[#E94D35] hover:bg-[#E94D35]/90">
                <a
                  href={template.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <LinkIcon className="mr-2 h-4 w-4" />
                  Посмотреть проект
                </a>
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <Alert variant="destructive" className="max-w-5xl mx-auto">
        <AlertTitle>Ошибка</AlertTitle>
        <AlertDescription>
          Не удалось загрузить данные портфолио. Пожалуйста, попробуйте позже
          или свяжитесь с администратором.
        </AlertDescription>
      </Alert>
    );
  }
}

function PortfolioSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 space-y-8">
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-8 w-8" />
      </div>

      <div className="space-y-6">
        <Skeleton className="h-16 w-3/4" />

        <Skeleton className="aspect-video w-full rounded-lg" />

        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-6 w-20" />
          ))}
        </div>

        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>

        <div className="border-t border-[#323232] pt-6">
          <Skeleton className="h-8 w-40 mb-4" />
          <div className="flex flex-wrap gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center space-x-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <Skeleton className="h-10 w-40" />
        </div>
      </div>
    </div>
  );
}

export default function PortfolioDetail({
  params,
}: {
  params: { title: string };
}) {
  return (
    <section className="text-white border-b border-[#323232]">
      <div className="container border-l border-r border-[#323232] py-16 px-6">
        <Suspense fallback={<PortfolioSkeleton />}>
          <PortfolioContent title={params.title} />
        </Suspense>
      </div>
    </section>
  );
}
