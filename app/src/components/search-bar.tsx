
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CardContent, Card } from "@/components/ui/card"

export function SearchBar() {
  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-6 space-y-6">
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Rent a Car</h1>
        <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          Find the perfect vehicle for your next adventure. Enter the make or model to get started.
        </p>
      </div>
      <div className="border rounded-lg">
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="search">
            Search
          </Label>
          <Input className="rounded-t-lg" id="search" placeholder="Search by make or model" />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <Card className="flex flex-col">
          <img
            alt="Car"
            className="aspect-video object-cover rounded-t-xl"
            height={310}
            src="/placeholder.svg"
            width={500}
          />
          <CardContent className="flex-1 flex flex-col items-start p-4 md:p-6">
            <h3 className="font-bold text-xl">Tesla Model S</h3>
            <p className="text-gray-500 dark:text-gray-400">Luxury sedan</p>
            <h4 className="font-bold text-2xl md:text-3xl">$150/day</h4>
            <Button className="mt-auto w-full">Rent Now</Button>
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <img
            alt="Car"
            className="aspect-video object-cover rounded-t-xl"
            height={310}
            src="/placeholder.svg"
            width={500}
          />
          <CardContent className="flex-1 flex flex-col items-start p-4 md:p-6">
            <h3 className="font-bold text-xl">Jeep Wrangler</h3>
            <p className="text-gray-500 dark:text-gray-400">Off-road SUV</p>
            <h4 className="font-bold text-2xl md:text-3xl">$100/day</h4>
            <Button className="mt-auto w-full">Rent Now</Button>
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <img
            alt="Car"
            className="aspect-video object-cover rounded-t-xl"
            height={310}
            src="/placeholder.svg"
            width={500}
          />
          <CardContent className="flex-1 flex flex-col items-start p-4 md:p-6">
            <h3 className="font-bold text-xl">Toyota Prius</h3>
            <p className="text-gray-500 dark:text-gray-400">Hybrid</p>
            <h4 className="font-bold text-2xl md:text-3xl">$80/day</h4>
            <Button className="mt-auto w-full">Rent Now</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
