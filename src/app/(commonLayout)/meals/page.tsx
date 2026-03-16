import { Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import MealsFilterSidebar from "@/components/modules/meals/MealsFilterSidebar"
import MealCard from "@/components/modules/meals/MealCard"


const demoMeals = [
  {
    id: "1",
    title: "Smoky Grilled Chicken Bowl",
    description:
      "Tender grilled chicken served with herbed rice, sautéed vegetables, and signature sauce.",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
    price: 320,
    cuisine: "Bangladeshi",
    dietary: "High Protein",
  },
  {
    id: "2",
    title: "Creamy Pasta Alfredo",
    description:
      "Rich and creamy pasta topped with parmesan, herbs, and roasted mushrooms.",
    image:
      "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=1200&auto=format&fit=crop",
    price: 410,
    cuisine: "Italian",
    dietary: "Vegetarian",
  },
  {
    id: "3",
    title: "Beef Burger Deluxe",
    description:
      "Juicy beef patty with cheddar, lettuce, tomato, caramelized onion, and fries.",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop",
    price: 280,
    cuisine: "Fast Food",
    dietary: "Regular",
  },
  {
    id: "4",
    title: "Fresh Salmon Plate",
    description:
      "Pan-seared salmon with roasted vegetables, mashed potato, and lemon butter glaze.",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1200&auto=format&fit=crop",
    price: 520,
    cuisine: "Seafood",
    dietary: "Keto",
  },
  {
    id: "5",
    title: "Thai Chicken Noodles",
    description:
      "Savory noodles with grilled chicken, vegetables, peanuts, and Thai-style dressing.",
    image:
      "https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=1200&auto=format&fit=crop",
    price: 360,
    cuisine: "Thai",
    dietary: "Regular",
  },
  {
    id: "6",
    title: "Garden Veggie Salad",
    description:
      "Crisp greens, avocado, tomato, cucumber, roasted seeds, and house vinaigrette.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop",
    price: 220,
    cuisine: "Healthy",
    dietary: "Vegan",
  },
  {
    id: "7",
    title: "Spicy Fried Rice Combo",
    description:
      "Flavor-packed fried rice with egg, vegetables, chili chicken, and fresh herbs.",
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=1200&auto=format&fit=crop",
    price: 300,
    cuisine: "Chinese",
    dietary: "Regular",
  },
  {
    id: "8",
    title: "Classic Biryani Special",
    description:
      "Aromatic basmati rice layered with spiced chicken, saffron, and caramelized onion.",
    image:
      "https://images.unsplash.com/photo-1701579231349-d7459c40919d?q=80&w=1200&auto=format&fit=crop",
    price: 450,
    cuisine: "Bangladeshi",
    dietary: "Halal",
  },
]

export default function MealsPage() {
  return (
    <main className="max-w-7xl mx-auto min-h-screen">
      <section className="border-b border-border/60">
        <div className="container mx-auto px-4 py-10">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Discover Meals
            </span>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Browse meals that match your craving
            </h1>

            <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
              Explore fresh dishes from trusted providers. Filter by price,
              cuisine, dietary preference, and search exactly what you want.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <MealsFilterSidebar />
          </aside>

          <div className="min-w-0">
            <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-border/60 bg-card/70 p-4 shadow-sm backdrop-blur sm:p-5">
              <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search meals, cuisines, or ingredients..."
                    className="h-11 rounded-2xl border-border/60 bg-background pl-10"
                  />
                </div>

                <div className="flex gap-3">
                  <Select>
                    <SelectTrigger className="h-11 w-full min-w-[160px] rounded-2xl border-border/60 bg-background">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="latest">Latest</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                    </SelectContent>
                  </Select>

                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        className="h-11 rounded-2xl lg:hidden"
                      >
                        <SlidersHorizontal className="mr-2 size-4" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[320px] overflow-y-auto p-0">
                      <div className="p-5">
                        <MealsFilterSidebar />
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  Bangladeshi
                </span>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  Under ৳500
                </span>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  Vegetarian
                </span>
                <span className="text-xs text-muted-foreground">
                  48 meals found
                </span>
              </div>
            </div>

            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">Available Meals</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Clean, modern food cards ready for your API integration
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {demoMeals.map((meal) => (
                <MealCard key={meal.id} meal={meal} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}