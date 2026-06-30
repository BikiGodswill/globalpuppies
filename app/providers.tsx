"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { useState, ReactNode } from "react";
import { CartProvider } from "@/hooks/useCart";

export const Providers = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#1C1917",
              color: "#FFF7ED",
              borderRadius: "12px",
              fontSize: "14px",
              fontFamily: "var(--font-inter)",
            },
            success: {
              iconTheme: { primary: "#F97316", secondary: "#FFF7ED" },
            },
            error: {
              iconTheme: { primary: "#EF4444", secondary: "#FFF7ED" },
            },
          }}
        />
      </CartProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
