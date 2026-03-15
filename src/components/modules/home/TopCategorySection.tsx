import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Category } from "@/types/category"

type CategorySectionProps = {
  categories: Category[]
}

export default function CategorySection({
  categories,
}: CategorySectionProps) {


  return (
    <section className="bg-gradient-to-b from-primary/[0.04] via-background to-background py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:mb-12 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Top Categories
            </span>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Order by cuisine, not by confusion
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
              Pick from the most popular food categories and discover meals that
              match your craving in seconds.
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

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/meals?category=${category.slug}`}
              className="group overflow-hidden rounded-[28px] border border-border/60 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-44 overflow-hidden bg-gradient-to-br from-primary/15 via-primary/5 to-transparent">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,102,0,0.18),transparent_38%)]" />

                <div className="absolute left-6 top-6 rounded-2xl bg-background/80 p-3 shadow-sm backdrop-blur">
                  <div className="relative size-14 overflow-hidden rounded-xl">
                    <Image
                      src={category.logo}
                      alt={category.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="absolute bottom-5 left-6 right-6">
                  <div className="inline-flex rounded-full border border-primary/15 bg-background/85 px-3 py-1 text-xs font-medium text-primary backdrop-blur">
                    {category.slug}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-foreground">
                      {category.name}
                    </h3>
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
                      {category.description}
                    </p>
                  </div>

                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowUpRight className="size-4" />
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium text-foreground/80">
                    Explore meals
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}