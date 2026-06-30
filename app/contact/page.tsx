"use client";
import { useState } from "react";
import type { Metadata } from "next";
import {
  RiMailLine, RiPhoneLine, RiMapPinLine,
  RiTimeLine, RiSendPlaneLine,
} from "react-icons/ri";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "", email: "", subject: "", message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Message sent! We'll respond within 24 hours.");
    setForm({ name: "", email: "", subject: "", message: "" });
    setSubmitting(false);
  };

  return (
    <div className="pt-20">
      {/* Header */}
      <div className="bg-gradient-to-b from-brand-50 to-warm-50 py-16">
        <div className="container-max text-center">
          <p className="text-brand-500 text-sm font-semibold uppercase tracking-widest mb-2">
            Get In Touch
          </p>
          <h1 className="font-display font-bold text-warm-900 text-5xl md:text-6xl">
            Contact Us
          </h1>
          <p className="text-warm-500 mt-4 max-w-md mx-auto text-lg">
            Have a question? Our team is here to help you find your perfect companion.
          </p>
        </div>
      </div>

      <div className="container-max py-14">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact info */}
          <div className="space-y-6">
            <div>
              <h2 className="font-display font-bold text-warm-900 text-2xl mb-6">
                Contact Information
              </h2>
            </div>

            {[
              {
                icon: RiMailLine,
                title: "Email",
                lines: ["support@globalpuppies.com", "sales@globalpuppies.com"],
                color: "bg-brand-100 text-brand-600",
              },
              {
                icon: RiPhoneLine,
                title: "Phone",
                lines: ["+1 (800) 555-PUPS", "Mon–Fri, 9am–6pm EST"],
                color: "bg-green-100 text-green-600",
              },
              {
                icon: RiMapPinLine,
                title: "Address",
                lines: ["123 Kennel Lane", "New York, NY 10001, USA"],
                color: "bg-blue-100 text-blue-600",
              },
              {
                icon: RiTimeLine,
                title: "Business Hours",
                lines: ["Mon–Fri: 9am – 6pm EST", "Sat–Sun: 10am – 4pm EST"],
                color: "bg-purple-100 text-purple-600",
              },
            ].map(({ icon: Icon, title, lines, color }) => (
              <div key={title} className="flex gap-4">
                <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-warm-800">{title}</p>
                  {lines.map((l) => (
                    <p key={l} className="text-warm-500 text-sm">{l}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="card p-8 space-y-5">
              <h2 className="font-display font-bold text-warm-900 text-2xl">
                Send a Message
              </h2>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-semibold text-warm-600 uppercase tracking-wider block mb-1.5">
                    Your Name *
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="input"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-warm-600 uppercase tracking-wider block mb-1.5">
                    Email Address *
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="input"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-warm-600 uppercase tracking-wider block mb-1.5">
                  Subject *
                </label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="input"
                >
                  <option value="">Select a topic...</option>
                  <option value="general">General Inquiry</option>
                  <option value="puppy">Puppy Availability</option>
                  <option value="order">Order Support</option>
                  <option value="shipping">Shipping & Delivery</option>
                  <option value="health">Health Guarantee</option>
                  <option value="breeder">Become a Partner Breeder</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-warm-600 uppercase tracking-wider block mb-1.5">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Tell us how we can help you..."
                  className="input resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full py-4 text-base disabled:opacity-70"
              >
                <RiSendPlaneLine className="w-5 h-5" />
                {submitting ? "Sending..." : "Send Message"}
              </button>

              <p className="text-warm-400 text-xs text-center">
                We typically respond within 24 hours on business days.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
