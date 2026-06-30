/**
 * GlobalPuppies — Supabase Seed Script
 *
 * Run with:  npx ts-node --esm scripts/seed.ts
 * Or copy-paste into Supabase SQL editor after adjusting.
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in env.
 */

import { createClient } from "@supabase/supabase-js";
import { MOCK_PUPPIES } from "../utils/mockData";

import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/lib/supabase/client";

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
// console.log(supabaseKey);
// const supabase = createClient(supabaseUrl, supabaseKey, {
//   auth: { autoRefreshToken: false, persistSession: false },
// });

const seed = async () => {
  console.log(`Seeding ${MOCK_PUPPIES.length} puppies...`);

  const now = new Date().toISOString();
  const records = MOCK_PUPPIES.map((p) => ({
    ...p,
    id: uuidv4(),
    created_at: now,
    updated_at: now,
  }));

  const { error } = await supabase    .from("puppies")
    .upsert(records, { onConflict: "id" });

  if (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }

  console.log(`Successfully seeded ${records.length} puppies!`);
  process.exit(0);
};

seed();
