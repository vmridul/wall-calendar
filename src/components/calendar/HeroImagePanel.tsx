import Image from "next/image";
import { MonthBanner } from "@/components/calendar/MonthBanner";

type HeroImagePanelProps = {
  image: string;
  month: string;
  year: number;
};

export function HeroImagePanel({ image, month, year }: HeroImagePanelProps) {
  return (
    <section className="relative h-[260px] overflow-hidden bg-slate-200 sm:h-[300px] md:h-[360px]">
      <Image
        src={image}
        alt={`${month} calendar`}
        fill
        sizes="(max-width: 768px) 100vw, 1200px"
        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-white/10" />
      <MonthBanner month={month} year={year} />
    </section>
  );
}
