"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export function CarouselComponent() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const images = [
    "/image_1.jpg",
    "/image_2.jpg",
      "/image_3.jpg",
      "/image_4.jpg",
      "/image_5.jpg",
        "/image_6.jpg",
  ];

  return (
    <div className="w-full h-[60vh] flex items-center justify-center p-4">
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-6xl h-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {images.map((src, index) => (
            <CarouselItem key={index}>
              <div className="p-1 h-[80vh]">
                <Card className="h-full">
                  <CardContent className="flex items-center justify-center p-0 h-full">
                    <div className="relative w-full h-full">
                      <Image
                        src={src}
                        alt={`Carousel image ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover rounded-lg"
                        priority={index === 0}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}