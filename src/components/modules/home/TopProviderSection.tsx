import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Dot } from "lucide-react"

import { getProviders } from "@/services/categories/getProviders"
import { Bricolage_Grotesque, Open_Sans } from "next/font/google"

export const bricolage = Bricolage_Grotesque()
export const open_Sans = Open_Sans()


export default async function TopProvidersSection() {
  const topProviders = await getProviders(5)

  return (
    <section className="py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <span className={`${open_Sans.className} inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-xl font-bold text-primary`}>
              Top Providers
            </span>

            <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-4xl">
              Popular restaurants near you
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Discover trusted restaurants and food providers with great meals,
              clear details, and live availability.
            </p>
          </div>

          <Link
            href="/providers"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:gap-3"
          >
            View all providers
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {topProviders.map((provider) => (
            <Link
              key={provider.id}
              href={`/providers/${provider.id}`}
              className="group block"
            >
              <article className="flex h-fit flex-col overflow-hidden  bg-card ">
                <div className="relative h-40 shrink-0 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.08)] ">
                  <Image
                    src={provider.businessLogo}
                    alt={provider.businessName}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03] rounded-xl"
                  />

                  {/* <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" /> */}

                  <div className="absolute bottom-4 right-4">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium backdrop-blur ${
                        provider.isOpen
                          ? "bg-emerald-500/90 text-white"
                          : "bg-black/65 text-white"
                      }`}
                    >
                      <span
                        className={`mr-2 inline-block h-2 w-2 rounded-full ${
                          provider.isOpen ? "bg-white" : "bg-zinc-300"
                        }`}
                      />
                      {provider.isOpen ? "Open Now" : "Closed"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col pt-4 ">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <h3 className={`line-clamp-1 text-xl font-bold tracking-tight text-foreground ${bricolage.className}`}>
                        {provider.businessName}
                      </h3>

                      <div className="mt-2 flex  items-start text-sm text-muted-foreground">
                        <span className="line-clamp-1">
                          {provider.businessSubtitle}
                        </span>
                      </div>
                    </div>

                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                      <ArrowUpRight className="size-4" />
                    </div>
                  </div>

                  <div className="mt-3 flex items-center text-sm text-muted-foreground">
                    <span className="font-bold">{provider.isOpen ? "Accepting Orders" : "Currently Unavailable"}</span>
                    <Dot className="size-4 shrink-0" />
                    <span className="line-clamp-1 font-extrabold text-black">{provider.city}</span>
                  </div>

                  <p className="mt-4 line-clamp-2 h-fit text-sm leading-6 text-muted-foreground ">
                    {provider.description}
                  </p>

                  <div className="mt-auto flex items-center pt-5 pl-0.5 gap-2 text-sm">
                    <span
                      className={`inline-flex h-2.5 w-2.5 rounded-full ${
                        provider.isOpen ? "bg-emerald-500" : "bg-zinc-400"
                      }`}
                    />
                    <span className="font-medium text-foreground/80">
                      {provider.isOpen
                        ? "Available for orders"
                        : "Temporarily closed"}
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}