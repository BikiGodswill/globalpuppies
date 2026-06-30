import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { orderService } from "@/services/orderService";
import { Order, OrderStatus } from "@/types";

export const ORDER_KEYS = {
  all: ["orders"] as const,
  detail: (id: string) => ["orders", id] as const,
  tracking: (num: string) => ["orders", "tracking", num] as const,
};

export const useOrders = () =>
  useQuery({
    queryKey: ORDER_KEYS.all,
    queryFn: orderService.getAll,
    staleTime: 1000 * 30,
  });

export const useOrder = (id: string) =>
  useQuery({
    queryKey: ORDER_KEYS.detail(id),
    queryFn: () => orderService.getById(id),
    enabled: !!id,
  });

export const useOrderByTracking = (trackingNumber: string) =>
  useQuery({
    queryKey: ORDER_KEYS.tracking(trackingNumber),
    queryFn: () => orderService.getByTracking(trackingNumber),
    enabled: !!trackingNumber,
    staleTime: 0,
  });

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      status,
      message,
      location,
    }: {
      id: string;
      status: OrderStatus;
      message: string;
      location?: string;
    }) => orderService.updateStatus(id, status, message, location),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ORDER_KEYS.all });
    },
  });
};
