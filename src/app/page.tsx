"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { QueryResult } from "@upstash/vector";
import { Product } from "@/db";
const SORT_OPTIONS = [
  { name: "None", value: "none" },
  { name: "Price: Low to High", value: "price-asc" },
  { name: "Price: High to Low", value: "price-desc" },
] as const;

export default function Home() {
  const [filter, setFilter] = useState({ sort: "none" });

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios.post<QueryResult<Product>[]>(
        "http://localhost:3000/api/products",
        {
          filter: {
            sort: filter.sort,
          },
        }
      );
      return data;
    },
  });
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 flex self-center">
          Browse By Brands
        </h1>
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
              Sort
              <ChevronDown className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.name}
                  className={cn("text-left w-full block px-4 py-2 text-sm", {
                    "text-gray-900 bg-gray-100": option.value === filter.sort,
                    "text-gray-500": option.value !== filter.sort,
                  })}
                  onClick={() => {
                    setFilter((prev: any) => ({
                      ...prev,
                      sort: option.value,
                    }));
                  }}
                >
                  {option.name}
                </button>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <button className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden">
            <Filter className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="flex justify-center pb-6 pt-14 max-auto mx-full">
        <Carousel
          className="w-full"
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="pl-1 basis-1/3 sm:basis-1/4 md:basis-1/6 lg:basis-1/7"
              >
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <Image
                        src={`/brand_${index + 1}.png`}
                        alt={`Carousel image ${index + 1}`}
                        width={400} // Set to the actual width of your image
                        height={400} // Set to the actual height of your image
                        className="object-cover"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="flex flex-col place-content-between w-full min-h-screen p-4 md:flex-row md:p-10 m-3">
        {/* Filter search */}
        <aside className="w-full md:w-1/4">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-blue-600">
                Search
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select>
                <SelectTrigger aria-label="New">
                  <SelectValue placeholder="New" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">all</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="used">Used</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger aria-label="Select A Brand">
                  <SelectValue placeholder="Select A Brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BMW">BMW</SelectItem>
                  <SelectItem value="HYUNDAI">HYUNDAI</SelectItem>
                  <SelectItem value="Nissan">Nissan</SelectItem>
                  <SelectItem value="Toyota">Toyota</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger aria-label="Select A Model">
                  <SelectValue placeholder="Select A Model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="model1">2000</SelectItem>
                  <SelectItem value="model2">2001</SelectItem>
                  <SelectItem value="model3">2003</SelectItem>
                  <SelectItem value="model4">2004</SelectItem>
                  <SelectItem value="model5">2005</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger aria-label="Select A Type">
                  <SelectValue placeholder="Select A Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="type1">SUV</SelectItem>
                  <SelectItem value="type2">Coupe</SelectItem>
                  <SelectItem value="type3">Sedan</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger aria-label="Select A Transmission">
                  <SelectValue placeholder="Select A Transmission" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="transmission1">Manual</SelectItem>
                  <SelectItem value="transmission2">Automatic</SelectItem>
                  <SelectItem value="transmission2">Dual</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger aria-label="Select A Interior Color">
                  <SelectValue placeholder="Select A Interior Color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="color1">Color 1</SelectItem>
                  <SelectItem value="color2">Color 2</SelectItem>
                </SelectContent>
              </Select>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <Input type="range" min="150000" max="450000" step="1000" />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>150000.00</span>
                  <span>450000.00</span>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                reset filters
              </Button>
              <Button className="w-full bg-blue-600 text-white">filter</Button>
            </CardContent>
          </Card>
        </aside>

        <main className="flex-1 md:ml-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-0">
                <Image
                  src="/blue_1.png"
                  alt="Car"
                  className="w-full h-48 object-cover"
                  width="300"
                  height="200"
                  style={{ aspectRatio: "300/200", objectFit: "cover" }}
                />
              </CardContent>
              <CardFooter className="flex justify-between p-4">
                <div>
                  <h3 className="text-lg font-bold">C3</h3>
                  <p className="text-sm text-gray-500">SUV</p>
                  <p className="text-lg font-bold text-blue-600">0 EGP</p>
                </div>
                <Button variant="outline" className="self-end">
                  Details
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardContent className="p-0">
                <Image
                  src="/red_2.png"
                  alt="Car"
                  className="w-full h-48 object-cover"
                  width="300"
                  height="200"
                  style={{ aspectRatio: "300/200", objectFit: "cover" }}
                />
              </CardContent>
              <CardFooter className="flex justify-between p-4">
                <div>
                  <h3 className="text-lg font-bold">C5</h3>
                  <p className="text-sm text-gray-500">SUV</p>
                  <p className="text-lg font-bold text-blue-600">0 EGP</p>
                </div>
                <Button variant="outline" className="self-end">
                  Details
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardContent className="p-0">
                <Image
                  src="/white_3.png"
                  alt="Car"
                  className="w-full h-48 object-cover"
                  width="300"
                  height="200"
                  style={{ aspectRatio: "300/200", objectFit: "cover" }}
                />
              </CardContent>
              <CardFooter className="flex justify-between p-4">
                <div>
                  <h3 className="text-lg font-bold">C-Elysee</h3>
                  <p className="text-sm text-gray-500">Sedan</p>
                  <p className="text-lg font-bold text-blue-600">0 EGP</p>
                </div>
                <Button variant="outline" className="self-end">
                  Details
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardContent className="p-0">
                <Image
                  src="/black_2.png"
                  alt="Car"
                  className="w-full h-48 object-cover"
                  width="300"
                  height="200"
                  style={{ aspectRatio: "300/200", objectFit: "cover" }}
                />
              </CardContent>
              <CardFooter className="flex justify-between p-4">
                <div>
                  <h3 className="text-lg font-bold">Tipo Automatic</h3>
                  <p className="text-sm text-gray-500">Sedan</p>
                  <p className="text-lg font-bold text-blue-600">0 EGP</p>
                </div>
                <Button variant="outline" className="self-end">
                  Details
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardContent className="p-0">
                <Image
                  src="/blue_3.png"
                  alt="Car"
                  className="w-full h-48 object-cover"
                  width="300"
                  height="200"
                  style={{ aspectRatio: "300/200", objectFit: "cover" }}
                />
              </CardContent>
              <CardFooter className="flex justify-between p-4">
                <div>
                  <h3 className="text-lg font-bold">Tipo Hatchback</h3>
                  <p className="text-sm text-gray-500">Hatchback</p>
                  <p className="text-lg font-bold text-blue-600">0 EGP</p>
                </div>
                <Button variant="outline" className="self-end">
                  Details
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardContent className="p-0">
                <Image
                  src="/white_4.png"
                  alt="Car"
                  className="w-full h-48 object-cover"
                  width="300"
                  height="200"
                  style={{ aspectRatio: "300/200", objectFit: "cover" }}
                />
              </CardContent>
              <CardFooter className="flex justify-between p-4">
                <div>
                  <h3 className="text-lg font-bold">S4</h3>
                  <p className="text-sm text-gray-500">SUV</p>
                  <p className="text-lg font-bold text-blue-600">0 EGP</p>
                </div>
                <Button variant="outline" className="self-end">
                  Details
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </main>
  );
}
