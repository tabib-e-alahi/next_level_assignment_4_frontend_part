"use client";

import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import {
      Carousel,
      CarouselContent,
      CarouselItem,
      CarouselNext,
      CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const slides = [
      {
            id: 1,
            badge: "Delicious Meals, Delivered Fast",
            title: "Order Your Favorite Food From Trusted Local Providers",
            description:
                  "Browse meals, explore cuisines, and enjoy fresh food delivered to your door with a smooth and simple experience.",
            primaryCta: {
                  label: "Browse Meals",
                  href: "/meals",
            },
            secondaryCta: {
                  label: "Become a Provider",
                  href: "/register",
            },
            image:
                  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1400&auto=format&fit=crop",
      },
      {
            id: 2,
            badge: "Fresh Menus From Real Kitchens",
            title: "Discover Homemade, Restaurant-Style, and Specialty Dishes",
            description:
                  "From Bangladeshi classics to burgers, pasta, and desserts, FoodHub helps you find meals that match your mood and taste.",
            primaryCta: {
                  label: "Explore Categories",
                  href: "/meals",
            },
            secondaryCta: {
                  label: "View Providers",
                  href: "/providers",
            },
            image:
                  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1400&auto=format&fit=crop",
      },
      {
            id: 3,
            badge: "Built For Customers, Providers, and Admins",
            title: "One Platform To Order, Manage Menus, and Run Food Operations",
            description:
                  "Customers can order easily, providers can manage menus and orders, and admins can keep the platform organized and reliable.",
            primaryCta: {
                  label: "Get Started",
                  href: "/register",
            },
            secondaryCta: {
                  label: "Login",
                  href: "/login",
            },
            image:
                  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1400&auto=format&fit=crop",
      },
];

export default function Hero() {
      return (
            <section className="relative overflow-hidden">
                  <div className="mx-auto  px-4 py-10 md:px-24 md:py-14 lg:py-16 ">
                      <Carousel
          opts={{ loop: true }}
          plugins={[Autoplay({ delay: 4000, stopOnInteraction: true })]}
          className="w-full overflow-hidden"
        >
          <CarouselContent>

            {slides.map((slide) => (
              <CarouselItem key={slide.id}>
                <div className="grid lg:grid-cols-2 items-center gap-10 bg-white rounded-2xl  p-6 md:max-w-7xl mx-auto border-2 border-red-500">

                  {/* TEXT */}
                  <div>
                    <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                      {slide.title}
                    </h1>

                    <p className="mt-5 text-gray-600 text-lg">
                      {slide.description}
                    </p>

                    <div className="mt-6 flex gap-4">
                      <Button asChild>
                        <Link href="/meals">Browse Meals</Link>
                      </Button>

                      <Button variant="outline" asChild>
                        <Link href="/register">Become Provider</Link>
                      </Button>
                    </div>
                  </div>

                  {/* IMAGE */}
                  <div className="w-full h-[320px] md:h-[420px]">
                    <img
                      src={slide.image}
                      alt="Food"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>

                </div>
              </CarouselItem>
            ))}

          </CarouselContent>

          <div className="flex justify-center gap-4 mt-6">
            <CarouselPrevious />
            <CarouselNext />
          </div>

        </Carousel>
                  </div>
            </section>
      );
}