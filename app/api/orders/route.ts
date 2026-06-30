import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { CartItem } from "@/types";
import { randomUUID } from "crypto";

const getAdmin = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

const generateTrackingNumber = () => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `GP${timestamp}${random}`;
};

export async function GET() {
  try {
    const { data, error } = await getAdmin()
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json({ orders: data || [] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customer_name, customer_email, customer_phone,
      street, city, state, zip, country,
      payment_method, notes, items, subtotal, shipping_cost, total,
    } = body;

    if (!customer_name || !customer_email || !items?.length) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const tracking_number = generateTrackingNumber();
    const initialUpdate = {
      id: randomUUID(),
      status: "confirmed",
      message: "Your order has been confirmed and is being processed.",
      timestamp: new Date().toISOString(),
    };

    const orderItems = (items as CartItem[]).map((ci) => ({
      puppy_id: ci.puppy.id,
      puppy_name: ci.puppy.name,
      breed: ci.puppy.breed,
      price: ci.puppy.price,
      quantity: ci.quantity,
      image_url: ci.puppy.image_url,
    }));

    const { data: order, error } = await getAdmin()
      .from("orders")
      .insert({
        tracking_number,
        customer_name,
        customer_email,
        customer_phone,
        shipping_address: { street, city, state, zip, country },
        items: orderItems,
        subtotal,
        shipping_cost,
        total,
        payment_method,
        payment_status: "pending",
        order_status: "confirmed",
        tracking_updates: [initialUpdate],
        notes: notes || null,
      })
      .select()
      .single();

    if (error) throw error;

    // Send emails asynchronously (don't block response)
    try {
      const { emailService } = await import("@/services/emailService");
      Promise.allSettled([
        emailService.sendOrderConfirmation(order),
        emailService.sendAdminNotification(order),
      ]);
    } catch (emailErr) {
      console.error("Email error:", emailErr);
    }

    return NextResponse.json({ order }, { status: 201 });
  } catch (err: any) {
    console.error("Create order error:", err);
    return NextResponse.json({ error: err.message || "Failed to create order" }, { status: 500 });
  }
}
