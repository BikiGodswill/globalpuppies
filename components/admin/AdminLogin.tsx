"use client";
import { useState } from "react";
import { RiLockLine, RiMailLine, RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { authService } from "@/services/authService";
import toast from "react-hot-toast";

interface Props { onLogin: () => void }

export const AdminLogin = ({ onLogin }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const user = authService.login(email, password);
    if (user) {
      toast.success("Welcome back, Admin!");
      onLogin();
    } else {
      toast.error("Invalid credentials. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-warm-900 flex items-center justify-center px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-brand-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-brand-600/10 blur-3xl" />
      </div>

      <div className="w-full max-w-md relative">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-brand-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-brand-500/30">
            <span className="text-white font-display font-bold text-2xl">G</span>
          </div>
          <h1 className="font-display font-bold text-white text-3xl">
            Admin Portal
          </h1>
          <p className="text-warm-400 text-sm mt-2">
            GlobalPuppies Management Dashboard
          </p>
        </div>

        {/* Form */}
        <div className="bg-warm-800 rounded-2xl border border-warm-700 p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-semibold text-warm-400 uppercase tracking-wider block mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <RiMailLine className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@globalpuppies.com"
                  className="w-full bg-warm-900 border border-warm-600 text-warm-100 placeholder-warm-600 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-warm-400 uppercase tracking-wider block mb-1.5">
                Password
              </label>
              <div className="relative">
                <RiLockLine className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-500" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••"
                  className="w-full bg-warm-900 border border-warm-600 text-warm-100 placeholder-warm-600 rounded-xl px-4 py-3 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-500 hover:text-warm-300"
                >
                  {showPass ? <RiEyeOffLine className="w-4 h-4" /> : <RiEyeLine className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-500 hover:bg-brand-600 text-white font-semibold py-4 rounded-xl transition-colors disabled:opacity-70 mt-2"
            >
              {loading ? "Signing in..." : "Sign In to Dashboard"}
            </button>
          </form>
        </div>

        <p className="text-warm-600 text-xs text-center mt-4">
          Restricted access — authorized personnel only
        </p>
      </div>
    </div>
  );
};
