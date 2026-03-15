import { Clock3, ShieldCheck, Store, Truck } from "lucide-react"

const features = [
  {
    title: "Fresh From Trusted Kitchens",
    description:
      "Order from verified food providers serving quality meals with clear business details and reliable service.",
    icon: Store,
  },
  {
    title: "Fast & Smooth Ordering",
    description:
      "Browse categories, discover restaurants, and place your order through a simple and user-friendly experience.",
    icon: Clock3,
  },
  {
    title: "Safe & Transparent Experience",
    description:
      "See provider details, availability status, and meal information before you order, so every decision feels clear.",
    icon: ShieldCheck,
  },
  {
    title: "Convenient Delivery Flow",
    description:
      "From choosing your meal to checkout and order tracking, FoodHub makes the entire journey feel effortless.",
    icon: Truck,
  },
]

export default function WhyPlatera() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Why Choose FoodHub
            </span>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              A smarter way to discover and order food
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              FoodHub connects hungry customers with trusted food providers
              through a clean, modern, and reliable ordering experience. From
              browsing meals to checking availability, everything is designed to
              feel simple and useful.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon

                return (
                  <div
                    key={feature.title}
                    className="rounded-2xl border border-border/60 bg-card p-5 transition-all duration-300 hover:border-primary/20 hover:shadow-[0_12px_35px_rgba(255,102,0,0.08)]"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>

                    <h3 className="text-lg font-semibold tracking-tight text-foreground">
                      {feature.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-[32px] bg-primary/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-[32px] border border-primary/10 bg-gradient-to-br from-[#fff4ed] via-background to-background p-6 shadow-[0_18px_50px_rgba(0,0,0,0.06)] sm:p-8">
              <div className="grid gap-4">
                <div className="rounded-2xl bg-background p-5 shadow-sm ring-1 ring-border/50">
                  <p className="text-sm font-medium text-muted-foreground">
                    Active Providers
                  </p>
                  <h3 className="mt-2 text-3xl font-semibold text-foreground">
                    120+
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-background p-5 shadow-sm ring-1 ring-border/50">
                    <p className="text-sm font-medium text-muted-foreground">
                      Cuisine Types
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-foreground">
                      25+
                    </h3>
                  </div>

                  <div className="rounded-2xl bg-background p-5 shadow-sm ring-1 ring-border/50">
                    <p className="text-sm font-medium text-muted-foreground">
                      Daily Orders
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-foreground">
                      500+
                    </h3>
                  </div>
                </div>

                <div className="rounded-2xl border border-primary/15 bg-primary/[0.06] p-5">
                  <p className="text-sm leading-6 text-foreground/80">
                    Discover meals faster, compare providers more easily, and
                    order with confidence from a platform built around clarity
                    and convenience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}