import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

import { getCategories } from "@/services/categories/getCategories"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import "./home.css"

export default async function CategorySection() {
  const categories = await getCategories(6)

  if (!categories.length) return null

  return (
    <section className="home-section">
      <div className="home-container">

        <hr className="sec-rule" />

        <div className="cat-header">
          <div>
            <div className="sec-eyebrow">
              <span className="sec-eyebrow-dot" />
              Top Categories
            </div>
            <h2 className="sec-title">
              Explore by <em>cuisine</em>
            </h2>
            <p className="sec-sub">
              Browse the most loved food categories and jump into the meals people crave most.
            </p>
          </div>

          <Link href="/categories" className="sec-link">
            View all categories
            <ArrowUpRight size={12} />
          </Link>
        </div>

        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-4">
            {categories.map((category) => (
              <CarouselItem
                key={category.id}
                className="pl-4 basis-[78%] sm:basis-[48%] md:basis-[32%] lg:basis-[24%] xl:basis-[18%]"
              >
                <Link
                  href={`/meals?category=${category.slug}`}
                  className="cat-card"
                >
                  <div className="cat-img-wrap">
                    <Image
                      src={category.logo}
                      alt={category.name}
                      fill
                      sizes="40"
                      className="object-cover"
                    />
                    <div className="cat-img-veil" />
                  </div>

                  <div className="cat-body">
                    <h3 className="cat-name">{category.name.toLowerCase()}</h3>

                    {category.description && (
                      <p className="cat-desc">{category.description}</p>
                    )}

                    <span className="cat-explore">
                      Explore
                      <ArrowUpRight size={10} />
                    </span>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="carousel-prev -left-3 sm:-left-5" />
          <CarouselNext    className="carousel-next -right-3 sm:-right-5" />
        </Carousel>

      </div>
    </section>
  )
}