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

import "./home.css";

const slides = [
  {
    id: 1,
    badge: "Delicious Meals, Delivered Fast",
    title: "Order Your Favorite Food From Trusted Local Providers",
    description:
      "Browse meals, explore cuisines, and enjoy fresh food delivered to your door with a smooth and simple experience.",
    primaryCta: { label: "Browse Meals",       href: "/meals"    },
    secondaryCta: { label: "Become a Provider", href: "/register" },
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 2,
    badge: "Fresh Menus From Real Kitchens",
    title: "Discover Homemade, Restaurant-Style, and Specialty Dishes",
    description:
      "From Bangladeshi classics to burgers, pasta, and desserts, FoodHub helps you find meals that match your mood and taste.",
    primaryCta: { label: "Explore Categories", href: "/meals"     },
    secondaryCta: { label: "View Providers",   href: "/providers" },
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 3,
    badge: "Built For Customers, Providers, and Admins",
    title: "One Platform To Order, Manage Menus, and Run Food Operations",
    description:
      "Customers can order easily, providers can manage menus and orders, and admins can keep the platform organized and reliable.",
    primaryCta: { label: "Get Started", href: "/register" },
    secondaryCta: { label: "Login",     href: "/login"    },
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1400&auto=format&fit=crop",
  },
];

export default function Hero() {
  return (
    <section className="hero-root">
      <div className="hero-grid-bg" aria-hidden />

      <div className="hero-inner">
        <Carousel
          opts={{ loop: true }}
          plugins={[Autoplay({ delay: 4000, stopOnInteraction: true })]}
          className="w-full"
        >
          <CarouselContent>
            {slides.map((slide) => (
              <CarouselItem key={slide.id}>
                <div className="hero-slide">

                  {/* TEXT */}
                  <div>
                    <div className="hero-badge">
                      <span className="hero-badge-dot" />
                      {slide.badge}
                    </div>

                    <h1 className="hero-title">
                      {/* italic the first few words for editorial feel */}
                      <em>{slide.title.split(" ").slice(0, 3).join(" ")}</em>{" "}
                      {slide.title.split(" ").slice(3).join(" ")}
                    </h1>

                    <p className="hero-desc">{slide.description}</p>

                    <div className="hero-ctas">
                      <Link href={slide.primaryCta.href} className="hero-cta-primary">
                        {slide.primaryCta.label}
                      </Link>
                      <Link href={slide.secondaryCta.href} className="hero-cta-secondary">
                        {slide.secondaryCta.label}
                      </Link>
                    </div>
                  </div>

                  {/* IMAGE */}
                  <div className="hero-img-wrap">
                    <img src={slide.image} alt="Food" />
                    <div className="hero-img-veil" />
                  </div>

                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="hero-nav">
            <CarouselPrevious className="carousel-prev" />
            <CarouselNext  className="carousel-next" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}