import React from "react";
import { Product } from "@/hooks/useProducts";
import Image from "next/image";
import Link from "next/link";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white rounded-xl p-4 hover:shadow-lg transition duration-300 flex flex-col text-center cursor-pointer">
        {/* Product image */}
        <div className="relative w-[300px] h-[400px] mb-4 mx-auto">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        </div>

        {/* Product title and price */}
        <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2">
          {product.title}
        </h3>
        <span className="text-md text-black mb-8">
          ${product.price.toFixed(2)}
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
