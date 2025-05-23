"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PageTitle from "@/components/ui/PageTitle";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Footer from "@/components/Footer";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "@/redux/cartSlice";
import { RootState } from "@/redux/store";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import styles
import Swal from "sweetalert2"; // Import SweetAlert2

export default function CartPage() {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();
  const [wrapGift, setWrapGift] = useState(false);

  const handleIncrease = (id: string) => {
    dispatch(increaseQuantity(id));
    toast.success("Quantity increased!"); // Show success notification
  };

  const handleDecrease = (id: string) => {
    dispatch(decreaseQuantity(id));
    toast.info("Quantity decreased."); // Show info notification
  };

  const handleRemove = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        // Remove item from cart if user confirms
        dispatch(removeFromCart(id));
        toast.error("Item removed from cart."); // Show error notification
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
      }
    });
  };

  const calculateSubtotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const giftWrapPrice = 10;
  const subtotal = calculateSubtotal();
  const total = wrapGift ? subtotal + giftWrapPrice : subtotal;

  return (
    <>
      <div className="mb-6">
        <PageTitle title="Shopping Cart" />
        <Breadcrumb current="Your Shopping Cart" />
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12 max-w-screen-xl">
        {cart.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>Your cart is currently empty.</p>
            <button
              onClick={() => router.push("/")}
              className="mt-4 px-6 py-3 border border-black text-black rounded-md text-lg font-medium hover:bg-black hover:text-white transition-all"
            >
              Go to Shop
            </button>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full min-w-[800px] text-sm lg:text-base">
                <thead>
                  <tr className="text-left border-b border-gray-200 text-gray-600">
                    <th className="py-4 pr-4">Product</th>
                    <th className="py-4 pr-4">Price</th>
                    <th className="py-4 pr-4">Quantity</th>
                    <th className="py-4">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-6 pr-4">
                        <div className="flex items-center gap-4 min-w-[250px]">
                          <Image
                            src={product.image}
                            alt={product.title}
                            width={80}
                            height={80}
                            className="object-contain rounded"
                          />
                          <div className="flex flex-col">
                            <p className="font-semibold leading-tight mb-2">
                              {product.title}
                            </p>
                            <button
                              onClick={() => handleRemove(product.id)}
                              className="text-sm text-gray-500 hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 pr-4">${product.price.toFixed(2)}</td>
                      <td className="py-6 pr-4">
                        <div className="flex items-center border rounded w-fit">
                          <button
                            onClick={() => handleDecrease(product.id)}
                            className="px-3 py-1 text-xl text-gray-600 hover:text-black btn-animate"
                          >
                            −
                          </button>
                          <span className="px-3 text-sm">
                            {product.quantity.toString().padStart(2, "0")}
                          </span>
                          <button
                            onClick={() => handleIncrease(product.id)}
                            className="px-3 py-1 text-xl text-gray-600 hover:text-black btn-animate"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-6">
                        ${(product.price * product.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-6">
              {cart.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col border rounded-lg p-4 shadow-sm"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={80}
                      height={80}
                      className="object-contain rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-base mb-1">
                        {product.title}
                      </h3>
                      <button
                        onClick={() => handleRemove(product.id)}
                        className="text-sm text-gray-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-semibold">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Quantity:</span>
                    <div className="flex items-center border rounded">
                      <button
                        onClick={() => handleDecrease(product.id)}
                        className="px-3 py-1 text-xl text-gray-600 hover:text-black btn-animate"
                      >
                        −
                      </button>
                      <span className="px-3">
                        {product.quantity.toString().padStart(2, "0")}
                      </span>
                      <button
                        onClick={() => handleIncrease(product.id)}
                        className="px-3 py-1 text-xl text-gray-600 hover:text-black btn-animate"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-semibold">
                      ${(product.price * product.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Gift Wrap + Summary */}
            <div className="w-full md:w-[50%] lg:w-[30%] ml-auto mt-8">
              <div className="flex items-center border-t pt-4 mb-4 space-x-3">
                <input
                  type="checkbox"
                  checked={wrapGift}
                  onChange={() => setWrapGift(!wrapGift)}
                  className="w-5 h-5"
                />
                <span className="text-sm text-gray-500">
                  For ${giftWrapPrice.toFixed(2)} Please Wrap The Product
                </span>
              </div>

              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button className="w-full px-6 py-3 bg-black text-white rounded-md text-lg font-medium hover:bg-gray-800 transition-all">
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />

      {/* Add ToastContainer to show notifications */}
      <ToastContainer />
    </>
  );
}
