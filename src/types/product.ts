// src/types/index.ts
export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  rating: { rate: number; count: number };
  stock: number;
  quantity?: number;
}
