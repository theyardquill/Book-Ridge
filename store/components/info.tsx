"use client";

import { Book } from "@/types";
import Currency from "@/components/ui/currency";
import Button from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import useCart from "@/hooks/use-cart";

interface InfoProps {
    data: Book;
}

const Info: React.FC<InfoProps> = ({ data }) => {
    const cart = useCart();

    const onAddToCart = () => {
        cart.addItem(data);
    };

    return (
        <div>
            {/* Book Name */}
            <h1 className="text-lg font-bold text-[#994C00]">{data.name}</h1>

            {/* Price */}
            <div className="flex items-end justify-between mt-3">
                <span className="text-md text-gray-900">
                    <Currency value={data?.price} />
                </span>
            </div>

            {/* Description */}
            {data.description && (
                <p className="mt-3 text-sm text-gray-600">{data.description}</p>
            )}

            {/* Divider */}
            <hr className="my-4" />

            {/* Details */}
            <div className="flex flex-col gap-y-6">
                {/* Grade */}
                <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-black">Grade</h3>
                    <div>{data?.grade?.name || "N/A"}</div>
                </div>

                {/* Duration */}
                <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-black">Duration:</h3>
                    <div>{data?.duration?.name}</div>
                </div>

                {/* Pathway */}
                <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-black">Pathway:</h3>
                    <div>{data?.pathway?.name}</div>
                </div>
            </div>

            {/* Add to Cart Button */}
            <div className="flex items-center mt-10 gap-x-4">
                <Button
                    onClick={onAddToCart}
                    className="flex bg-[#556B2F] items-center text-white gap-x-2"
                >
                    Add to Cart
                    <ShoppingCart />
                </Button>
            </div>
        </div>
    );
};

export default Info;
