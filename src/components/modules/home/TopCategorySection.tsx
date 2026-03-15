import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { Cinzel, Open_Sans, Raleway } from "next/font/google"

import { getCategories } from "@/services/categories/getCategories"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["600", "700"],
})

const open_Sans = Open_Sans()

export default async function CategorySection() {
  const categories = await getCategories(6)

  if (!categories.length) return null

  return (
    <section className=" py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:mb-12 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className={`inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-xl font-bold text-primary ${open_Sans.className}`}>
              Top Categories
            </span>

            <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-4xl">
              Explore by cuisine
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
              Browse the most loved food categories and jump into the meals people crave most.
            </p>
          </div>

          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:gap-3"
          >
            View all categories
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {categories.map((category) => (
              <CarouselItem
                key={category.id}
                className="pl-4 basis-[78%] sm:basis-[48%] md:basis-[32%] lg:basis-[24%] xl:basis-[18%]"
              >
                <Link
                  href={`/meals?category=${category.slug}`}
                  className="group block"
                >
                  <div className="overflow-hidden rounded-[28px] border border-primary/10 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(255,102,0,0.10)]">
                    {/* Top visual half */}
                    <div className="relative h-40 overflow-hidden rounded-b-[20px] bg-[#f7f4f1]">
                      <Image
                        src={category.logo}
                        alt={category.name}
                        fill
                        sizes="40"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Bottom content half */}
                    <div className="px-4 pb-4 pt-5 text-center">
                      <h3
                        className={`${raleway.className} line-clamp-1 text-[16px] font-bold tracking-tight text-foreground md:text-[24px] capitalize`}
                      >
                        {category.name.toLowerCase()}
                      </h3>

                      {category.description ? (
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                          {category.description}
                        </p>
                      ) : null}

                      <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
                        <span>Explore</span>
                        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="-left-3 border-primary/15 bg-background/90 text-foreground shadow-md backdrop-blur sm:-left-5" />
          <CarouselNext className="-right-3 border-primary/15 bg-background/90 text-foreground shadow-md backdrop-blur sm:-right-5" />
        </Carousel>
      </div>
    </section>
  )
}