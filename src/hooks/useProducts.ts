// src/hooks/useProducts.ts
"use client";

import { useEffect, useState } from "react";

export type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  description: string;
};

export default function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  return { products, loading };
}
