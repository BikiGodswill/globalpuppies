"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { RiCloseLine, RiUpload2Line, RiLoader4Line } from "react-icons/ri";
import { useCreatePuppy, useUpdatePuppy } from "@/hooks/usePuppies";
import { Puppy } from "@/types";
import toast from "react-hot-toast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  puppy: Puppy | null;
}

const EMPTY_FORM = {
  name: "", breed: "", age_weeks: 8, price: 1500, gender: "Male" as "Male" | "Female",
  color: "", weight_lbs: 3.0, description: "", image_url: "",
  is_available: true, is_vaccinated: true, is_microchipped: false,
  health_certificate: false, registration: "AKC", temperament: [] as string[],
};

export const AdminPuppyModal = ({ isOpen, onClose, puppy }: Props) => {
  const createMutation = useCreatePuppy();
  const updateMutation = useUpdatePuppy();
  const [form, setForm] = useState(EMPTY_FORM);
  const [temperamentInput, setTemperamentInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (puppy) {
      setForm({
        name: puppy.name, breed: puppy.breed, age_weeks: puppy.age_weeks,
        price: puppy.price, gender: puppy.gender, color: puppy.color,
        weight_lbs: puppy.weight_lbs, description: puppy.description,
        image_url: puppy.image_url, is_available: puppy.is_available,
        is_vaccinated: puppy.is_vaccinated, is_microchipped: puppy.is_microchipped,
        health_certificate: puppy.health_certificate, registration: puppy.registration,
        temperament: puppy.temperament,
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [puppy, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setForm((p) => ({ ...p, [name]: type === "number" ? Number(val) : val }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setForm((p) => ({ ...p, image_url: data.url }));
      toast.success("Image uploaded!");
    } catch {
      toast.error("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const addTemperament = () => {
    if (temperamentInput.trim() && !form.temperament.includes(temperamentInput.trim())) {
      setForm((p) => ({ ...p, temperament: [...p.temperament, temperamentInput.trim()] }));
      setTemperamentInput("");
    }
  };

  const removeTemperament = (t: string) => {
    setForm((p) => ({ ...p, temperament: p.temperament.filter((x) => x !== t) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (puppy) {
        await updateMutation.mutateAsync({ id: puppy.id, updates: form });
        toast.success(`${form.name} updated!`);
      } else {
        await createMutation.mutateAsync(form);
        toast.success(`${form.name} added to the shop!`);
      }
      onClose();
    } catch {
      toast.error("Failed to save puppy.");
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative bg-warm-800 rounded-2xl border border-warm-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-warm-700 sticky top-0 bg-warm-800 z-10">
          <h2 className="font-display font-bold text-white text-xl">
            {puppy ? `Edit: ${puppy.name}` : "Add New Puppy"}
          </h2>
          <button onClick={onClose} className="text-warm-400 hover:text-white">
            <RiCloseLine className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Image upload */}
          <div>
            <label className="text-xs font-semibold text-warm-400 uppercase tracking-wider block mb-2">
              Puppy Image *
            </label>
            <div
              className="border-2 border-dashed border-warm-600 rounded-xl p-4 text-center cursor-pointer hover:border-brand-500 transition-colors"
              onClick={() => fileRef.current?.click()}
            >
              {form.image_url ? (
                <div className="relative h-40 rounded-lg overflow-hidden">
                  <Image src={form.image_url} alt="Preview" fill className="object-cover" sizes="400px" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <span className="text-white text-sm font-medium">Change Image</span>
                  </div>
                </div>
              ) : (
                <div className="py-6">
                  {uploading ? (
                    <RiLoader4Line className="w-8 h-8 text-brand-400 mx-auto animate-spin" />
                  ) : (
                    <RiUpload2Line className="w-8 h-8 text-warm-500 mx-auto mb-2" />
                  )}
                  <p className="text-warm-400 text-sm">
                    {uploading ? "Uploading..." : "Click to upload image"}
                  </p>
                  <p className="text-warm-600 text-xs mt-1">JPG, PNG up to 10MB</p>
                </div>
              )}
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </div>
            {/* Or URL */}
            <input
              name="image_url"
              value={form.image_url}
              onChange={handleChange}
              placeholder="Or paste image URL directly"
              className="mt-2 w-full bg-warm-900 border border-warm-600 text-warm-200 placeholder-warm-600 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Name & Breed */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-warm-400 uppercase tracking-wider block mb-1.5">Name *</label>
              <input name="name" value={form.name} onChange={handleChange} required placeholder="e.g. Bella" className="w-full bg-warm-900 border border-warm-600 text-warm-200 placeholder-warm-600 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div>
              <label className="text-xs font-semibold text-warm-400 uppercase tracking-wider block mb-1.5">Breed *</label>
              <input name="breed" value={form.breed} onChange={handleChange} required placeholder="e.g. Golden Retriever" className="w-full bg-warm-900 border border-warm-600 text-warm-200 placeholder-warm-600 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
          </div>

          {/* Age, Price, Weight */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-warm-400 uppercase tracking-wider block mb-1.5">Age (weeks)</label>
              <input name="age_weeks" type="number" min={4} max={52} value={form.age_weeks} onChange={handleChange} className="w-full bg-warm-900 border border-warm-600 text-warm-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div>
              <label className="text-xs font-semibold text-warm-400 uppercase tracking-wider block mb-1.5">Price (USD)</label>
              <input name="price" type="number" min={100} value={form.price} onChange={handleChange} className="w-full bg-warm-900 border border-warm-600 text-warm-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div>
              <label className="text-xs font-semibold text-warm-400 uppercase tracking-wider block mb-1.5">Weight (lbs)</label>
              <input name="weight_lbs" type="number" step="0.1" min={0.5} value={form.weight_lbs} onChange={handleChange} className="w-full bg-warm-900 border border-warm-600 text-warm-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
          </div>

          {/* Gender, Color, Registration */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-warm-400 uppercase tracking-wider block mb-1.5">Gender</label>
              <select name="gender" value={form.gender} onChange={handleChange} className="w-full bg-warm-900 border border-warm-600 text-warm-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-warm-400 uppercase tracking-wider block mb-1.5">Color</label>
              <input name="color" value={form.color} onChange={handleChange} required placeholder="e.g. Golden" className="w-full bg-warm-900 border border-warm-600 text-warm-200 placeholder-warm-600 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div>
              <label className="text-xs font-semibold text-warm-400 uppercase tracking-wider block mb-1.5">Registration</label>
              <select name="registration" value={form.registration} onChange={handleChange} className="w-full bg-warm-900 border border-warm-600 text-warm-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500">
                <option value="AKC">AKC</option>
                <option value="UKC">UKC</option>
                <option value="FCI">FCI</option>
                <option value="Designer">Designer</option>
                <option value="None">None</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-semibold text-warm-400 uppercase tracking-wider block mb-1.5">Description *</label>
            <textarea name="description" value={form.description} onChange={handleChange} required rows={3} placeholder="Describe the puppy's personality and traits..." className="w-full bg-warm-900 border border-warm-600 text-warm-200 placeholder-warm-600 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none" />
          </div>

          {/* Temperament */}
          <div>
            <label className="text-xs font-semibold text-warm-400 uppercase tracking-wider block mb-1.5">Temperament</label>
            <div className="flex gap-2">
              <input
                value={temperamentInput}
                onChange={(e) => setTemperamentInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTemperament())}
                placeholder="e.g. Gentle (press Enter)"
                className="flex-1 bg-warm-900 border border-warm-600 text-warm-200 placeholder-warm-600 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <button type="button" onClick={addTemperament} className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-sm">
                Add
              </button>
            </div>
            {form.temperament.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {form.temperament.map((t) => (
                  <span key={t} className="flex items-center gap-1 bg-brand-900/50 text-brand-300 text-xs px-2.5 py-1 rounded-full border border-brand-800">
                    {t}
                    <button type="button" onClick={() => removeTemperament(t)} className="hover:text-red-400">×</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Checkboxes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { name: "is_available", label: "Available" },
              { name: "is_vaccinated", label: "Vaccinated" },
              { name: "is_microchipped", label: "Microchipped" },
              { name: "health_certificate", label: "Health Cert" },
            ].map(({ name, label }) => (
              <label key={name} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name={name}
                  checked={form[name as keyof typeof form] as boolean}
                  onChange={handleChange}
                  className="w-4 h-4 accent-brand-500"
                />
                <span className="text-warm-300 text-sm">{label}</span>
              </label>
            ))}
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 bg-warm-700 hover:bg-warm-600 text-warm-300 rounded-xl font-medium transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={isPending || uploading} className="flex-1 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-semibold transition-colors disabled:opacity-70">
              {isPending ? "Saving..." : puppy ? "Save Changes" : "Add Puppy"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
