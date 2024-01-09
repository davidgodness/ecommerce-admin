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
  return NextResponse.json(
    {},
    {
      headers: corsHeaders,
    }
  );
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { productIds } = await req.json();

    if (!productIds || productIds.length === 0) {
      return new NextResponse("Product ids are required", { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: { id: { in: productIds } },
    });

    if (!products) {
      return new NextResponse("No products", { status: 404 });
    }

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    products.forEach((product) => {
      lineItems.push({
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: { name: product.name },
          unit_amount: product.price.toNumber() * 100,
        },
      });
    });

    const order = await prismadb.order.create({
      data: {
        storeId: params.storeId,
        isPaid: false,
        phone: "",
        address: "",
        products: {
          connect: products.map((product) => ({ id: product.id })),
        },
      },
    });

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      billing_address_collection: "required",
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${process.env.FRONTEND_STORE_URL}/cart?success`,
      cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled`,
      metadata: {
        orderId: order.id,
      },
    });

    return NextResponse.json({ url: session.url }, { headers: corsHeaders });
  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
