import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '@/lib/supabase/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16' as any,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { session_id, cart: bodyCart } = body;

    if (!session_id) {
      return NextResponse.json({ error: "No session id" }, { status: 400 });
    }

    let session;
    try {
      session = await stripe.checkout.sessions.retrieve(session_id);
    } catch (err) {
      console.error("Stripe retrieve error:", err);
      return NextResponse.json({ error: "Stripe error" }, { status: 500 });
    }

    if (session.payment_status === 'paid') {
      const total = session.metadata?.total || 0;
      const cartItems = JSON.parse(bodyCart || "[]");

      if (!cartItems || cartItems.length === 0) {
        console.error("Cart items empty");
        return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
      }

      // Ensure each item has necessary fields
      const validCartItems = cartItems.map((item: any) => ({
        name: item.name || "Unknown Product",
        price: Number(item.price || 0),
        quantity: Number(item.quantity || 1)
      }));

      try {
        console.log("Stripe Email:", session.customer_details?.email);
        console.log("Saving order for:", session.customer_details?.email);
        console.log("Saving Order:", validCartItems);

        await supabase.from("orders").insert([
          {
            user_email: session.metadata?.user_email || session.customer_details?.email || "guest",
            products: validCartItems,
            total: validCartItems.reduce(
              (sum: number, item: any) => sum + item.price * item.quantity,
              0
            ),
            created_at: new Date().toISOString()
          }
        ]);
      } catch (err) {
        console.error("DB error:", err);
      }

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Payment not successful' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Verify API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
