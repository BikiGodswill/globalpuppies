import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="pt-20">
      <div className="bg-warm-50 py-14">
        <div className="container-max max-w-3xl">
          <h1 className="font-display font-bold text-warm-900 text-5xl mb-3">Privacy Policy</h1>
          <p className="text-warm-500">Last updated: January 1, 2025</p>
        </div>
      </div>
      <div className="container-max max-w-3xl py-12">
        <div className="card p-8 space-y-8 text-warm-700 leading-relaxed">
          {[
            {
              title: "1. Information We Collect",
              body: "We collect information you provide directly to us, such as your name, email address, phone number, and shipping address when you place an order. We also collect payment information, though we do not store your full card details — those are handled by our secure payment processors.",
            },
            {
              title: "2. How We Use Your Information",
              body: "We use the information we collect to process and fulfill your orders, send order confirmations and shipping updates, respond to your inquiries, improve our services, and send promotional communications (you may opt out at any time).",
            },
            {
              title: "3. Information Sharing",
              body: "We do not sell your personal information. We share your information with third-party service providers who assist us in operating our website, processing payments, shipping puppies, and sending emails. All third parties are contractually required to keep your information confidential.",
            },
            {
              title: "4. Data Security",
              body: "We implement appropriate technical and organizational measures to protect your personal information against accidental or unlawful destruction, loss, alteration, or unauthorized disclosure. All transactions are encrypted using SSL technology.",
            },
            {
              title: "5. Cookies",
              body: "We use cookies to improve your experience on our website, including remembering your cart contents and preferences. You can control cookie settings through your browser preferences.",
            },
            {
              title: "6. Your Rights",
              body: "You have the right to access, correct, or delete your personal information. You may also object to or restrict the processing of your data. To exercise these rights, contact us at privacy@globalpuppies.com.",
            },
            {
              title: "7. Contact Us",
              body: "If you have any questions about this Privacy Policy, please contact us at privacy@globalpuppies.com or by mail at 123 Kennel Lane, New York, NY 10001, USA.",
            },
          ].map(({ title, body }) => (
            <div key={title}>
              <h2 className="font-display font-semibold text-warm-900 text-xl mb-3">{title}</h2>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
