"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Truck, Package, Share2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/cartSlice";
import trustbag from "../../trustbag.png";
import "react-toastify/dist/ReactToastify.css"; // Importing toast styles
import { ToastContainer, toast } from "react-toastify"; // Importing ToastContainer correctly

interface Product {
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

export default function ProductPage() {
  const router = useRouter();
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) throw new Error("Failed to fetch product");
        const data = await response.json();
        setProduct({
          id: data.id,
          title: data.title,
          price: data.price,
          originalPrice: data.price + 20,
          description: data.description,
          image: data.image,
          rating: data.rating,
          stock: data.rating.count,
        });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleIncrease = () => {
    if (quantity < (product?.stock || 0)) setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ ...product, quantity }));
      setQuantity(1);

      // Show toast notification after adding product to cart
      toast.success(`${product.title} added to cart!`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 mb-4">{error || "Product not found"}</p>
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const discountPercentage = product.originalPrice
    ? ((product.originalPrice - product.price) / product.originalPrice) * 100
    : 0;

  return (
    <div className="container mx-auto px-6 py-12 max-w-screen-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Product Image */}
        <div className="p-8 rounded-xl flex justify-center items-center">
          <Image
            src={product.image}
            alt={product.title}
            width={500}
            height={500}
            className="object-contain rounded-lg"
            priority
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col space-y-6">
          <div>
            <p className="text-sm text-gray-500 uppercase font-medium mb-1">
              FASCO
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug mb-2">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(product.rating.rate)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 text-sm text-gray-600">
                ({product.rating.count})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-2xl md:text-3xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-lg line-through text-gray-500">
                ${product.originalPrice?.toFixed(2)}
              </span>
              <span className="text-xs font-semibold bg-red-500 text-white px-2 py-1 rounded-full">
                SAVE {discountPercentage.toFixed(0)}%
              </span>
            </div>

            <p className="text-gray-700 text-base leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Stock */}
          <div>
            <p className="text-sm text-gray-700 mb-1">
              Only <span className="font-bold">{product.stock}</span> item(s)
              left in stock!
            </p>
            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-500 rounded-full"
                style={{
                  width: `${Math.min((product.stock / 100) * 100, 100)}%`,
                }}
              />
            </div>
          </div>

          {/* Quantity + Add to Cart */}
          <div className="flex items-center space-x-4 mt-4">
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm hover:shadow-md transition-all">
              <button
                onClick={handleDecrease}
                disabled={quantity <= 1}
                className={`text-xl font-semibold w-8 h-8 flex items-center justify-center rounded-full btn-animate ${
                  quantity <= 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100 hover:text-black"
                }`}
              >
                −
              </button>

              <span className="text-lg font-medium mx-4 min-w-[2rem] text-center">
                {quantity}
              </span>

              <button
                onClick={handleIncrease}
                disabled={quantity >= product.stock}
                className={`text-xl font-semibold w-8 h-8 flex items-center justify-center rounded-full btn-animate ${
                  quantity >= product.stock
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100 hover:text-black"
                }`}
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={quantity > product.stock}
              className={`flex-1 px-6 py-3 border border-black text-black rounded-md text-lg font-medium hover:bg-black hover:text-white transition-all ${
                quantity > product.stock ? "bg-gray-400 cursor-not-allowed" : ""
              }`}
            >
              {quantity > product.stock ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>

          {/* Share */}
          <div className="flex items-center gap-2 text-sm text-gray-700 mt-2">
            <Share2 className="w-4 h-4 text-gray-600" />
            <span>Share</span>
          </div>

          {/* Delivery Info */}
          <div className="pt-6 space-y-4 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-gray-600" />
              <span>
                <span className="font-semibold">Estimated Delivery:</span> Jul
                30 - Aug 03
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-gray-600" />
              <span>
                <span className="font-semibold">Free Shipping & Returns:</span>{" "}
                On all orders over $75
              </span>
            </div>

            <div className="bg-gray-100 rounded-md p-4 text-center">
              <Image
                src={trustbag}
                alt="Guarantee Icon"
                width={140}
                height={20}
                className="mx-auto mb-2"
              />
              <p className="text-sm font-medium text-gray-800">
                Guarantee safe & secure checkout
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}
