"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Container from "@/components/ui/container";
import useCart from "@/hooks/use-cart";
import CartItem from "./components/cart-item";
import Summary from "./components/summary";
import { CheckCircle } from "lucide-react";

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const cart = useCart();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ✅ Only run this once
  useEffect(() => {
    const success = searchParams.get("success");
    const cancelled = searchParams.get("cancelled");

    if (success === "1") {
      cart.removeAll();    // Removes items once
      setShowSuccess(true);
      router.replace("/cart"); // Replace URL without re‑triggering effect
      setTimeout(() => setShowSuccess(false), 5000);
    }
  }, []); // 🔑 Empty array so it runs only once

  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          {showSuccess && (
            <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <p className="text-green-800 font-medium">
                Payment successful! Your order has been confirmed.
              </p>
            </div>
          )}
          <h1 className="text-3xl font-bold text-[#994C00]">
            Book Basket
          </h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {cart?.items?.length === 0 && (
                <p className="text-neutral-500">
                  You Currently Have no Books in your Basket. Explore our Catalogue to Borrow a Book.
                </p>
              )}
              <ul>
                {cart?.items?.map((item) => (
                  <CartItem key={item.id} data={item} />
                ))}
              </ul>
            </div>
            <Summary />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;