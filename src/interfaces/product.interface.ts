import type { User } from "./user.interface";

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  slug: string;
  stock: number;
  sizes: Size[];
  gender: gender;
  tags: string[];
  images: string[];
  user: User;
}

export type Size = "S" | "M" | "L" | "XL" | "XS" | "XXL";
export type gender = "camisetas" | "sudaderas" | "chaquetas" | "accesorios";

