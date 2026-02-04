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

const heroes = [
  {
    id: 1,
    name: "Transformers",
    rating: 7.1,
    desc: "An ancient struggle between two Cybertronian races, the heroic Autobots and the evil Decepticons, comes to Earth, with a clue to the ultimate power held by a teenager.",
    img: "https://www.unicron.us/tf2007/moviepromo/transformers_final_standee.jpg",
  },
  {
    id: 2,
    name: "Wicked",
    rating: 6.9,
    desc: "Elphaba, a misunderstood young woman because of her green skin, and Glinda, a popular girl, become friends at Shiz University in the Land of Oz. After an encounter with the Wonderful Wizard of Oz, their friendship reaches a crossroads. ",
    img: "https://cdn.mos.cms.futurecdn.net/ftx3dyqAo6GpXChbzY2G9N.jpg",
  },
];

export function Hero() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );
  return (
    <div className="relative mx-auto">
      <Carousel
        plugins={[plugin.current]}
        onMouseEnter={() => plugin.current?.stop()}
        onMouseLeave={() => plugin.current?.reset()}
      >
        <CarouselContent>
          {heroes.map((hero, index) => (
            <CarouselItem key={index} className="w-full">
              <div
                className="w-full h-150 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${hero.img})`,
                }}
              >
                <div className="w-101 h-66 pl-35 pt-44.5 text-white">
                  <p className="text-[18px] font-normal">Now Playing:</p>
                  <h1 className="font-bold text-[36px]">{hero.name}</h1>
                  <div className="flex w-20.75 h-12 gap-2">
                    <h1 className="pt-0.5">
                      <Star size={28} fill="#FFDF00" color="#FFDF00" />
                    </h1>
                    <p className="font-semibold text-[22px]">
                      {hero.rating}
                      <span className="text-[16px] text-[#D3D3D3] font-normal">
                        /10
                      </span>
                    </p>
                  </div>
                  <div className="">
                    <p className="text-[12px] font-normal">{hero.desc}</p>
                  </div>
                  <div className="pt-2">
                    <Button variant="outline" size="sm" className="text-black">
                      <Play /> Watch Trailer
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20" />
      </Carousel>
    </div>
  );
}
