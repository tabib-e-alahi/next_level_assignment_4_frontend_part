import Image from "next/image"
import { Star, MapPin, Clock, ShoppingBag, ChevronRight, Flame, Leaf } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { mealService } from "@/services/meals/meals.service"
import { Meal, Review } from "@/types/mealsParams"

import "./singleMeal.css"

export async function generateStaticParams() {
  const { data } = await mealService.getMeals()
  return data?.map((meal: Meal) => ({ id: meal.id })).splice(0, 10)
}

export default async function SingleMealpage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { data: meal } = await mealService.getMealById(id)
  console.log(meal);
  const reviewsCount = meal?._count?.reviews || 0
  const avgRating =
    meal?.reviews?.length > 0
      ? (
        meal.reviews.reduce((sum: number, rev: Review) => sum + rev.rating, 0) /
        meal.reviews.length
      ).toFixed(1)
      : 0

  return (
    <TooltipProvider>
      <main className="meal-root">

        {/* atmosphere orbs */}
        <div className="orb orb-1" aria-hidden />
        <div className="orb orb-2" aria-hidden />

        {/* ── HERO ── */}
        <section className="hero">
          <Image
            src={meal?.imageURL}
            alt={meal?.title}
            fill
            priority
            className="hero-img"
          />
          <div className="hero-veil" />

          <div className="hero-copy">
            <div className="hero-eyebrow">
              <span className="live-dot" />
              {meal?.category?.name}
              <ChevronRight size={10} />
              Meal Details
            </div>

            <h1 className="hero-title">
              <em>{meal?.title?.split(" ").slice(0, 2).join(" ")}</em>{" "}
              {meal?.title?.split(" ").slice(2).join(" ")}
            </h1>

            <div className="hero-bottom">
              {avgRating ? (
                <span className="rating-chip">
                  <Star size={13} style={{ color: "#e8a030", fill: "#e8a030" }} />
                  <strong>{avgRating}</strong>
                  <span style={{ opacity: .55, fontSize: ".76rem" }}>
                    ({reviewsCount} reviews)
                  </span>
                </span>
              ) : null}

              <Badge
                variant="outline"
                className="border-white/20 bg-white/[0.07] text-white/80 backdrop-blur-sm text-[0.65rem] tracking-widest uppercase font-mono rounded-md px-3 py-1"
              >
                {meal?.category?.name}
              </Badge>

              {meal?.dietary_preferences?.map((tag: string) => (
                <Badge
                  key={tag}
                  className="bg-[#c8500a]/20 text-[#f09060] border border-[#c8500a]/40 hover:bg-[#c8500a]/35 text-[0.62rem] tracking-wide uppercase font-mono rounded-md px-3 py-1 transition-colors cursor-default"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="scroll-cue">
            <div className="scroll-line" />
            Scroll
          </div>
        </section>

        {/* ── BODY ── */}
        <div className="body-grid">

          {/* LEFT */}
          <div>

            {/* About */}
            <Card className="about-card">
              <CardHeader className="pb-2">
                <div className="sec-label">
                  <Flame size={11} />
                  About this meal
                </div>
                <h2 className="about-title">
                  Crafted with care,<br />served with soul.
                </h2>
              </CardHeader>
              <CardContent>
                <p className="about-body">{meal?.description}</p>

                <div className="stats-row">
                  <div className="stat">
                    <div className="stat-val">৳{meal?.price}</div>
                    <div className="stat-lbl">Base price</div>
                  </div>
                  <div className="stat">
                    <div className="stat-val">{avgRating || "—"}</div>
                    <div className="stat-lbl">Avg rating</div>
                  </div>
                  <div className="stat">
                    <div className="stat-val">{reviewsCount}</div>
                    <div className="stat-lbl">Reviews</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <div className="review-wrap">
              <div className="sec-label">
                <Star size={11} />
                Customer Reviews
              </div>

              {meal?.reviews?.length > 0 ? (
                <div>
                  {meal.reviews.slice(0, 5).map((review: Review, idx: number) => (
                    <Card key={idx} className="review-card">
                      <div className="review-accent" />
                      <CardContent className="pt-4">
                        <div className="review-header">
                          <div className="stars">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className={s <= review.rating ? "s-fill" : "s-empty"}
                              />
                            ))}
                          </div>
                          <span className="review-num">
                            #{String(idx + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <p className="review-text">
                          {review.comment}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="empty-reviews">
                  <Leaf size={20} style={{ margin: "0 auto .6rem", opacity: .28, display: "block" }} />
                  <p>No reviews yet — be the first to taste.</p>
                </div>
              )}
            </div>

          </div>

          {/* SIDEBAR */}
          <div className="sidebar">

            {/* Price card */}
            <Card className="price-card">
              <CardContent className="pt-6">
                <p className="price-lbl">Starting from</p>
                <div className="price-amount">
                  <span className="price-currency">৳</span>
                  {meal?.price}
                </div>

                <Button className="cta-btn">
                  <ShoppingBag size={15} className="mr-2 flex-shrink-0" />
                  Add to Cart
                </Button>

                <Separator className="my-5 bg-white/[0.08]" />

                <div className="delivery-info">
                  <Clock size={13} />
                  Estimated delivery in 25–30 mins
                </div>
              </CardContent>
            </Card>

            {/* Provider card */}
            <Card className="provider-card">
              <CardContent className="pt-5">
                <p className="provider-head">Provider</p>

                <div className="provider-row">
                  <div className="provider-avatar">B</div>
                  <div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <p className="provider-name cursor-default select-none">
                          {meal?.provider.businessName}
                        </p>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className="bg-[#2e2825] border border-[#c8500a]/30 text-[#f5f0e8] text-xs"
                      >
                        Verified home kitchen · Est. {meal?.provider.createdAt}
                      </TooltipContent>
                    </Tooltip>
                    <p className="provider-sub">{meal?.provider.businessSubtitle}</p>
                  </div>
                </div>

                <div className="provider-loc flex justify-between">
                  <div className="flex justify-center gap-0.5 items-center">
                    <MapPin size={12} />
                    {meal?.provider.city}
                  </div>
                  <div className="font-bold">
                    Contact: +88{meal?.provider.businessPhone}
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>

      </main>
    </TooltipProvider>
  )
}