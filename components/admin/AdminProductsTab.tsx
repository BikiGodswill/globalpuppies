"use client";
import { useState } from "react";
import Image from "next/image";
import {
  RiAddLine, RiEditLine, RiDeleteBin6Line,
  RiCheckboxCircleLine, RiCloseCircleLine,
} from "react-icons/ri";
import { usePuppies, useDeletePuppy } from "@/hooks/usePuppies";
import { Puppy } from "@/types";
import { formatPrice } from "@/utils/helpers";
import { AdminPuppyModal } from "./AdminPuppyModal";
import toast from "react-hot-toast";

export const AdminProductsTab = () => {
  const { data: puppies, isLoading } = usePuppies();
  const deleteMutation = useDeletePuppy();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Puppy | null>(null);

  const handleDelete = async (puppy: Puppy) => {
    if (!confirm(`Delete ${puppy.name}? This cannot be undone.`)) return;
    try {
      await deleteMutation.mutateAsync(puppy.id);
      toast.success(`${puppy.name} deleted.`);
    } catch {
      toast.error("Failed to delete puppy.");
    }
  };

  const openAdd = () => { setEditing(null); setModalOpen(true); };
  const openEdit = (p: Puppy) => { setEditing(p); setModalOpen(true); };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-warm-400 text-sm">
          {puppies?.length || 0} total puppies
        </p>
        <button onClick={openAdd} className="btn-primary text-sm">
          <RiAddLine className="w-4 h-4" />
          Add Puppy
        </button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-warm-800 rounded-xl p-4 animate-pulse">
              <div className="h-40 bg-warm-700 rounded-lg mb-3" />
              <div className="h-4 bg-warm-700 rounded w-2/3 mb-2" />
              <div className="h-3 bg-warm-700 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {puppies?.map((puppy) => (
            <div key={puppy.id} className="bg-warm-800 rounded-xl border border-warm-700 overflow-hidden hover:border-warm-600 transition-colors">
              <div className="relative aspect-video bg-warm-700">
                <Image
                  src={puppy.image_url}
                  alt={puppy.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
                <div className="absolute top-2 right-2">
                  <span className={`badge text-xs ${puppy.is_available ? "bg-green-500/90 text-white" : "bg-red-500/90 text-white"}`}>
                    {puppy.is_available ? "Available" : "Sold"}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="text-white font-semibold truncate">{puppy.name}</h3>
                    <p className="text-warm-400 text-sm">{puppy.breed}</p>
                  </div>
                  <p className="text-brand-400 font-bold shrink-0">{formatPrice(puppy.price)}</p>
                </div>

                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  <span className={`badge text-xs ${puppy.gender === "Male" ? "bg-blue-900 text-blue-300" : "bg-pink-900 text-pink-300"}`}>
                    {puppy.gender}
                  </span>
                  <span className="text-warm-500 text-xs">{puppy.age_weeks}w</span>
                  {puppy.is_vaccinated && (
                    <span className="text-green-400 text-xs flex items-center gap-0.5">
                      <RiCheckboxCircleLine className="w-3 h-3" /> Vaccinated
                    </span>
                  )}
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => openEdit(puppy)}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-warm-700 hover:bg-warm-600 text-warm-200 text-sm py-2 rounded-lg transition-colors"
                  >
                    <RiEditLine className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(puppy)}
                    className="flex items-center justify-center gap-1.5 bg-red-900/40 hover:bg-red-800/60 text-red-400 text-sm px-3 py-2 rounded-lg transition-colors"
                  >
                    <RiDeleteBin6Line className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AdminPuppyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        puppy={editing}
      />
    </div>
  );
};
