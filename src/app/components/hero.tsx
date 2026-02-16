"use client";

import { Button } from "@/components/ui/button";
import * as React from "react";
import { Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Star } from "lucide-react";
import { Movie } from "@/lib/types";

export function Hero({ nowplaying }: { nowplaying: Movie[] }) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );
  const baseImgUrl = "https://image.tmdb.org/t/p/original";
  return (
    <div className="relative mx-auto">
      <Carousel
        plugins={[plugin.current]}
        onMouseEnter={() => plugin.current?.stop()}
        onMouseLeave={() => plugin.current?.reset()}
      >
        <CarouselContent>
          {nowplaying.map((hero, index) => (
            <CarouselItem key={index} className="w-full">
              <div
                className="w-full relative h-75 md:h-150 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${baseImgUrl + hero.backdrop_path})`,
                }}
              >
                <div className="hidden absolute left-30 top-50 md:block w-101 h-66 text-white">
                  <p className="text-[18px] font-normal">Now Playing:</p>
                  <h1 className="font-bold text-[36px]">{hero.title}</h1>
                  <div className="flex w-20.75 h-12 gap-2">
                    <h1 className="pt-0.5">
                      <Star size={28} fill="#FFDF00" color="#FFDF00" />
                    </h1>
                    <p className="font-semibold text-[22px]">
                      {hero.vote_average.toFixed(1)}
                      <span className="text-[16px] text-[#D3D3D3] font-normal">
                        /10
                      </span>
                    </p>
                  </div>
                  <div className="">
                    <p className="text-[12px] font-normal shadow-2xl">
                      {hero.overview}
                    </p>
                  </div>
                  <div className="pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="dark:bg-gray-300 text-black"
                    >
                      <Play /> Watch Trailer
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-8 flex flex-col relative md:hidden">
                <p className="text-2xl">Now Playing:</p>
                <h1 className="text-[40px] font-semibold">{hero.title}</h1>
                <div className="flex gap-1 end-14 absolute">
                  <h1>
                    <Star size={30} fill="#FFDF00" color="#FFDF00" />
                  </h1>
                  <p className="font-semibold text-[22px]">
                    {hero.vote_average}
                    <span className="text-[16px] text-[#D3D3D3] font-normal">
                      /10
                    </span>
                  </p>
                </div>
                <p>{hero.overview}</p>
                <div className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-white bg-black h-10 "
                  >
                    <Play /> Watch Trailer
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4" />
        <CarouselNext className="absolute right-4" />
      </Carousel>
    </div>
  );
}
