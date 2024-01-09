import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  const body = await req.text();
  const sig = headers().get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_ENDPOINT_SECRET_KEY!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message()}`, {
      status: 400,
    });
  }

  console.log(event);

  const session = event.data.object as Stripe.Checkout.Session;

  const address = session.customer_details?.address;

  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ];

  const addressString = addressComponents.filter((c) => c !== null).join(", ");

  const phone = session.customer_details?.phone;

  try {
    if (event.type === "checkout.session.completed") {
      await prismadb.order.update({
        where: {
          id: session?.metadata?.orderId,
        },
        data: {
          isPaid: true,
          address: addressString,
          phone: phone || "",
        },
      });
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.log("[WEBHOOK_ERROR]", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
