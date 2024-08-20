import { Index } from "@upstash/vector";
import * as dotenv from "dotenv";

dotenv.config();
export type Product = {
  id: string;
  imageId: string;
  state: "new" | "used";
  name: string;
  brand: string;
  model: number;
  type: "suv" | "sedan" | "coupe";
  color: "white" | "black" | "red" | "blue";
  price: number;
  description: string;
};

export const db = new Index<Product>();
