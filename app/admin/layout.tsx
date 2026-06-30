import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Admin Dashboard", template: "%s | Admin — GlobalPuppies" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-warm-900">
      {children}
    </div>
  );
}
