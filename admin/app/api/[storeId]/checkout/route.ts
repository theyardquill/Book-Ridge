import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ storeId: string }> }
) {
  try {
    const { bookIds, phone, address } = await req.json();
    const { storeId } = await params; // ✅ MUST await params

    if (!bookIds || bookIds.length === 0) {
      return new NextResponse("Book ids are required", { status: 400 });
    }

    if (!phone || !address) {
      return new NextResponse("Phone and address are required", { status: 400 });
    }

    const books = await prismadb.book.findMany({
      where: {
        id: { in: bookIds },
        storeId,
        isArchived: false,
      },
    });

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    books.forEach((book) => {
      line_items.push({
        quantity: 1,
        price_data: {
          currency: "usd",
          product_data: {
            name: book.name,
          },
          unit_amount: Math.round(Number(book.price) * 100),
        },
      });
    });

    const order = await prismadb.order.create({
      data: {
        storeId,
        isPaid: false,
        phone,
        address,
        orderItems: {
          create: bookIds.map((bookId: string) => ({
            book: {
              connect: { id: bookId },
            },
          })),
        },
      },
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      billing_address_collection: "required",
      phone_number_collection: { enabled: true },
      success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
      cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?cancelled=1`,
      metadata: {
        orderId: order.id,
      },
    });

    return NextResponse.json(
      { url: session.url },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.log("[CHECKOUT_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}