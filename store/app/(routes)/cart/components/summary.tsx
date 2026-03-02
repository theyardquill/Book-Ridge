"use client";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  const [loading, setLoading] = useState(false);

  const totalPrice = items.reduce(
    (total, item) => total + Number(item.price),
    0
  );

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Your Order Has Been Placed Successfully.");
      removeAll();
    }

    // 🔥 your backend uses ?cancelled=1
    if (searchParams.get("cancelled")) {
      toast.error("Something went wrong.");
    }
  }, [searchParams, removeAll]);

  const onCheckout = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          bookIds: items.map((item) => item.id),
          phone: "0000000000", // 🔥 Replace with real input later
          address: "Test Address", // 🔥 Replace with real input later
        }
      );

      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Checkout failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-6 mt-16 rounded-lg bg-gray-50 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-[#994C00]">Your Basket</h2>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="text-base font-medium text-gray-400">
            Order Total
          </div>
          <Currency value={totalPrice} />
        </div>
      </div>

      <Button
        disabled={items.length === 0 || loading}
        className="w-full mt-6 bg-[#556B2F]"
        onClick={onCheckout}
      >
        {loading ? "Processing..." : "Checkout"}
      </Button>
    </div>
  );
};

export default Summary;