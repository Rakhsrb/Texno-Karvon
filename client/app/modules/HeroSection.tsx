import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="h-[80vh] md:h-screen border-b border-[#323232]">
      <div className="container h-full border-l border-r border-[#323232] p-6 grid lg:grid-cols-2 items-center relative">
        <div className="bg_animation">
          <div className="lines">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>

        <div className="space-y-6 z-10">
          <h2 className="text-white text-4xl md:text-5xl font-bold">
            IT-решения для вашего бизнеса Быстро, качественно, инновационно!
          </h2>
          <div className="flex items-center gap-2 text-sm font-medium text-white">
            WEBSITE <span className="text-red-500">✴</span> MOBILE APP{" "}
            <span className="text-red-500">✴</span> CRM
          </div>
          <div className="flex gap-2">
            <Link href={"/services"}>
              <Button
                variant="outline"
                className="rounded-lg hover:bg-[#b93b28] bg-[#E94D35] hover:text-white text-white border-black"
              >
                Нужен Сервис?
              </Button>
            </Link>
            <Link href={"tel:+998900021462"}>
              <Button variant="outline" className="rounded-lg border-black">
                Связаться
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
