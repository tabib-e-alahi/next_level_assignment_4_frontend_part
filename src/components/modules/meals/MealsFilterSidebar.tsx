import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { getCategories } from "@/services/categories/getCategories"
import { bricolage, open_Sans } from "../home/TopProviderSection"
import { mealService } from "@/services/meals/meals.service"


export default async function MealsFilterSidebar() {

  const categories = await getCategories()
  const dietaryPreferences = await mealService.getDietaryPreferences()

  console.log("From meals: ", categories);
  console.log("From meals: ", dietaryPreferences);

  return (
    <div className="rounded-3xl border border-border/60 bg-card p-5 shadow-sm">
      <div className="mb-5">
        <h3 className="text-lg font-semibold tracking-tight">Filters</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Narrow down meals by price, category, and dietary needs
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="text-sm font-medium">Price Range</Label>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="min-price" className="mb-2 block text-xs text-muted-foreground">
                Min Price
              </Label>
              <Input
                id="min-price"
                type="number"
                placeholder="100"
                className="rounded-2xl"
              />
            </div>
            <div>
              <Label htmlFor="max-price" className="mb-2 block text-xs text-muted-foreground">
                Max Price
              </Label>
              <Input
                id="max-price"
                type="number"
                placeholder="1000"
                className="rounded-2xl"
              />
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <Label className={`${open_Sans.className} text-[14px] font-bold`}>Cuisine Types</Label>
          <div className="mt-3 space-y-3">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center gap-3">
                <Checkbox id={category.id} />
                <Label
                  htmlFor={category.name}
                  className={`${bricolage.className} capitalize cursor-pointer font-medium `}
                >
                  {category.name.toLowerCase()}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <Label className={`${open_Sans.className} text-[14px] font-bold`}>Dietary Preferences</Label>
          <div className="mt-3 space-y-3">
            {dietaryPreferences.map((item : string) => (
              <div key={item} className="flex items-center gap-3">
                <Checkbox id={item} />
                <Label
                  htmlFor={item}
                  className={`${bricolage.className} capitalize cursor-pointer font-medium `}
                >
                  {item.toLowerCase()}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="flex gap-3">
          <Button className="flex-1 rounded-2xl">Apply Filters</Button>
          <Button variant="outline" className="flex-1 rounded-2xl">
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}