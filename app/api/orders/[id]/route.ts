import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "crypto";

const getAdmin = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await getAdmin()
      .from("orders")
      .select("*")
      .eq("id", params.id)
      .single();
    if (error) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ order: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status, message, location } = await req.json();
    const admin = getAdmin();

    const { data: existing, error: fetchError } = await admin
      .from("orders")
      .select("tracking_updates")
      .eq("id", params.id)
      .single();
    if (fetchError) throw fetchError;

    const newUpdate = {
      id: randomUUID(),
      status,
      message,
      location: location || undefined,
      timestamp: new Date().toISOString(),
    };

    const { data, error } = await admin
      .from("orders")
      .update({
        order_status: status,
        tracking_updates: [...(existing.tracking_updates || []), newUpdate],
      })
      .eq("id", params.id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ order: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
