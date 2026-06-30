"use client";
import { useState } from "react";
import { RiMailSendLine } from "react-icons/ri";
import toast from "react-hot-toast";

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success("You're subscribed! Welcome to the GlobalPuppies family.");
    setEmail("");
    setSubmitting(false);
  };

  return (
    <section className="section bg-gradient-to-br from-brand-500 to-brand-700">
      <div className="container-max">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6">
            <RiMailSendLine className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-display font-bold text-white text-4xl md:text-5xl">
            Stay in the Loop
          </h2>
          <p className="text-brand-100 mt-4 text-lg">
            Be the first to know when new puppies arrive. Get exclusive offers
            and expert puppy care tips delivered to your inbox.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-5 py-4 rounded-xl bg-white/95 text-warm-900 placeholder-warm-400 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
            />
            <button
              type="submit"
              disabled={submitting}
              className="bg-warm-900 hover:bg-warm-800 text-white font-semibold px-6 py-4 rounded-xl transition-colors shrink-0 disabled:opacity-70"
            >
              {submitting ? "Joining..." : "Subscribe"}
            </button>
          </form>
          <p className="text-brand-200 text-xs mt-4">
            No spam, ever. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};
