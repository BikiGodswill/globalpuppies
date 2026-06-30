import { supabase } from "@/lib/supabase/client";
import { Puppy } from "@/types";

// ─── CLIENT-SIDE READS (use anon key — safe in browser) ───────────────────────

export const puppyService = {
  getAll: async (): Promise<Puppy[]> => {
    const { data, error } = await supabase
      .from("puppies")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getById: async (id: string): Promise<Puppy | null> => {
    const { data, error } = await supabase
      .from("puppies")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  getAvailable: async (): Promise<Puppy[]> => {
    const { data, error } = await supabase
      .from("puppies")
      .select("*")
      .eq("is_available", true)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data || [];
  },

  // ─── ADMIN WRITES — go through API routes (server-side only) ───────────────

  create: async (
    puppy: Omit<Puppy, "id" | "created_at" | "updated_at">
  ): Promise<Puppy> => {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(puppy),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to create puppy");
    return data.puppy;
  },

  update: async (id: string, updates: Partial<Puppy>): Promise<Puppy> => {
    const res = await fetch(`/api/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to update puppy");
    return data.puppy;
  },

  delete: async (id: string): Promise<void> => {
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Failed to delete puppy");
    }
  },

  uploadImage: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Upload failed");
    return data.url;
  },
};
