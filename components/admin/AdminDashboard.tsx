"use client";
import { useState } from "react";
import {
  RiDashboardLine,
  RiDoorLine,
  RiShoppingBag3Line,
  RiLogoutBoxLine,
  RiMenuLine,
  RiCloseLine,
} from "react-icons/ri";
import { AdminProductsTab } from "./AdminProductsTab";
import { AdminOrdersTab } from "./AdminOrdersTab";

type Tab = "products" | "orders";

interface Props {
  onLogout: () => void;
}

export const AdminDashboard = ({ onLogout }: Props) => {
  const [tab, setTab] = useState<Tab>("products");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const NAV = [
    { id: "products" as Tab, label: "Puppies", icon: RiDoorLine },
    { id: "orders" as Tab, label: "Orders", icon: RiShoppingBag3Line },
  ];

  return (
    <div className=" bg-warm-900 flex">
      {/* Sidebar */}
      <>
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <aside
          className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-warm-800 border-r border-warm-700 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Logo */}
          <div className="p-6 border-b border-warm-700">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center">
                <span className="text-white font-display font-bold text-lg">
                  <img src='logo.png' alt="Logo" />
                </span>
              </div>
              <div>
                <p className="text-white font-display font-bold text-lg leading-none">
                  GlobalPuppies
                </p>
                <p className="text-gray-400 text-xs mt-0.5">Admin Dashboard</p>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 p-4 space-y-1">
            <p className="text-warm-600 text-xs font-semibold uppercase tracking-wider px-3 mb-2">
              Management
            </p>
            {NAV.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => {
                  setTab(id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colo text-gray-400 ${
                  tab === id
                    ? "bg-brand-500 text-white"
                    : "text-warm-400 hover:text-warm-100 hover:bg-warm-700"
                }`}
              >
                {/* <Icon className="w-5 h-5" /> */}
                {label}
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-warm-700">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-warm-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"
            >
              <RiLogoutBoxLine className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </aside>
      </>

      {/* Main */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-warm-800 border-b border-warm-700 px-4 sm:px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-warm-400 hover:text-white"
          >
            <RiMenuLine className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <RiDashboardLine className="w-4 h-4 text-brand-400" />
            <h1 className="font-display font-semibold text-white text-lg capitalize">
              {tab === "products" ? "Puppies Management" : "Orders Management"}
            </h1>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {tab === "products" && <AdminProductsTab />}
          {tab === "orders" && <AdminOrdersTab />}
        </main>
      </div>
    </div>
  );
};
