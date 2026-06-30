import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { puppyService } from "@/services/puppyService";
import { Puppy } from "@/types";

export const PUPPY_KEYS = {
  all: ["puppies"] as const,
  available: ["puppies", "available"] as const,
  detail: (id: string) => ["puppies", id] as const,
  breed: (breed: string) => ["puppies", "breed", breed] as const,
};

export const usePuppies = () =>
  useQuery({
    queryKey: PUPPY_KEYS.all,
    queryFn: puppyService.getAll,
    staleTime: 1000 * 60 * 2,
  });

export const useAvailablePuppies = () =>
  useQuery({
    queryKey: PUPPY_KEYS.available,
    queryFn: puppyService.getAvailable,
    staleTime: 1000 * 60 * 2,
  });

export const usePuppy = (id: string) =>
  useQuery({
    queryKey: PUPPY_KEYS.detail(id),
    queryFn: () => puppyService.getById(id),
    enabled: !!id,
  });

export const useCreatePuppy = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Puppy, "id" | "created_at" | "updated_at">) =>
      puppyService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PUPPY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: PUPPY_KEYS.available });
    },
  });
};

export const useUpdatePuppy = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Puppy> }) =>
      puppyService.update(id, updates),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: PUPPY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: PUPPY_KEYS.available });
      queryClient.invalidateQueries({ queryKey: PUPPY_KEYS.detail(id) });
    },
  });
};

export const useDeletePuppy = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => puppyService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PUPPY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: PUPPY_KEYS.available });
    },
  });
};
