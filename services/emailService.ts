import nodemailer from "nodemailer";
import { Order } from "@/types";
import {
  formatPrice,
  formatDate,
  PAYMENT_METHOD_LABELS,
} from "@/utils/helpers";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS,
  },
});

const buildOrderConfirmationHtml = (order: Order): string => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Order Confirmed — GlobalPuppies</title>
  <style>
    body { font-family: Georgia, serif; background: #FFF7ED; margin: 0; padding: 0; }
    .wrapper { max-width: 620px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #F97316, #C2410C); padding: 40px 32px; text-align: center; }
    .header h1 { color: #fff; margin: 0; font-size: 28px; letter-spacing: -0.5px; }
    .header p { color: #FED7AA; margin: 8px 0 0; font-size: 14px; }
    .body { padding: 32px; }
    .greeting { font-size: 20px; color: #1C1917; margin-bottom: 8px; }
    .intro { color: #57534E; font-size: 15px; line-height: 1.6; margin-bottom: 24px; }
    .tracking-box { background: #FFF7ED; border: 2px solid #FB923C; border-radius: 10px; padding: 20px; text-align: center; margin-bottom: 28px; }
    .tracking-label { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #9A3412; font-weight: bold; }
    .tracking-number { font-size: 28px; font-weight: bold; color: #C2410C; letter-spacing: 2px; margin-top: 4px; }
    .section-title { font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #9A3412; font-weight: bold; margin-bottom: 12px; border-bottom: 1px solid #FED7AA; padding-bottom: 8px; }
    .item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #F5F5F4; }
    .item-name { color: #1C1917; font-size: 15px; }
    .item-breed { color: #78716C; font-size: 13px; }
    .item-price { color: #C2410C; font-weight: bold; font-size: 15px; }
    .totals { margin-top: 16px; }
    .total-row { display: flex; justify-content: space-between; padding: 6px 0; color: #57534E; font-size: 14px; }
    .total-row.grand { font-size: 18px; font-weight: bold; color: #1C1917; padding-top: 10px; border-top: 2px solid #E7E5E4; }
    .address-block { background: #F5F5F4; border-radius: 8px; padding: 16px; margin-top: 20px; color: #57534E; font-size: 14px; line-height: 1.7; }
    .footer { background: #1C1917; padding: 28px 32px; text-align: center; }
    .footer p { color: #78716C; font-size: 13px; margin: 4px 0; }
    .footer a { color: #FB923C; text-decoration: none; }
    .btn { display: inline-block; background: #F97316; color: #fff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-size: 15px; font-weight: bold; margin: 24px 0; }
  </style>
</head>
<body>
<div class="wrapper">
  <div class="header">
    <h1>GlobalPuppies</h1>
    <p>Premium Puppies Delivered Worldwide</p>
  </div>
  <div class="body">
    <p class="greeting">Dear ${order.customer_name},</p>
    <p class="intro">
      Your order has been <strong>confirmed</strong>! We are thrilled to prepare your new furry family member.
      Our team will keep you updated at every step of the journey. You can track your order at any time using your
      unique tracking number below.
    </p>

    <div class="tracking-box">
      <div class="tracking-label">Your Tracking Number</div>
      <div class="tracking-number">${order.tracking_number}</div>
    </div>

    <div class="section-title">Order Summary</div>
    ${order.items
      .map(
        (item) => `
      <div class="item">
        <div>
          <div class="item-name">${item.puppy_name}</div>
          <div class="item-breed">${item.breed}</div>
        </div>
        <div class="item-price">${formatPrice(item.price)}</div>
      </div>
    `,
      )
      .join("")}

    <div class="totals">
      <div class="total-row"><span>Subtotal</span><span>${formatPrice(order.subtotal)}</span></div>
      <div class="total-row"><span>Shipping & Handling</span><span>${order.shipping_cost === 0 ? "FREE" : formatPrice(order.shipping_cost)}</span></div>
      <div class="total-row grand"><span>Total</span><span>${formatPrice(order.total)}</span></div>
    </div>

    <div style="margin-top: 28px;">
      <div class="section-title">Order Details</div>
      <div class="address-block">
        <strong>Order #:</strong> ${order.id.slice(0, 8).toUpperCase()}<br>
        <strong>Order Date:</strong> ${formatDate(order.created_at)}<br>
        <strong>Payment Method:</strong> ${PAYMENT_METHOD_LABELS[order.payment_method]}<br>
        <strong>Payment Status:</strong> ${order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}<br><br>
        <strong>Shipping To:</strong><br>
        ${order.shipping_address.street}<br>
        ${order.shipping_address.city}, ${order.shipping_address.state} ${order.shipping_address.zip}<br>
        ${order.shipping_address.country}
      </div>
    </div>

    <div style="text-align:center;">
      <a href="${process.env.NEXT_PUBLIC_SITE_URL}/order-tracking?tracking=${order.tracking_number}" class="btn">
        Track Your Order
      </a>
    </div>

    <p style="color: #78716C; font-size: 14px; line-height: 1.7;">
      If you have any questions about your order, please don't hesitate to reach out to us at
      <a href="mailto:support@globalpuppies.com" style="color: #F97316;">support@globalpuppies.com</a>.
      We're here to make this experience as wonderful as possible for you and your new companion.
    </p>
  </div>
  <div class="footer">
    <p><strong style="color: #F97316;">GlobalPuppies</strong></p>
    <p>Premium Puppies | Worldwide Delivery | Health Guaranteed</p>
    <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}">www.globalpuppies.com</a></p>
  </div>
</div>
</body>
</html>
`;

const buildAdminNotificationHtml = (order: Order): string => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>New Order — GlobalPuppies Admin</title></head>
<body style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #C2410C;">New Order Received — ${order.tracking_number}</h2>
  <p><strong>Customer:</strong> ${order.customer_name} (${order.customer_email})</p>
  <p><strong>Phone:</strong> ${order.customer_phone}</p>
  <p><strong>Total:</strong> ${formatPrice(order.total)}</p>
  <p><strong>Payment:</strong> ${PAYMENT_METHOD_LABELS[order.payment_method]}</p>
  <h3>Items:</h3>
  <ul>
    ${order.items.map((i) => `<li>${i.puppy_name} — ${i.breed} — ${formatPrice(i.price)}</li>`).join("")}
  </ul>
  <h3>Shipping Address:</h3>
  <p>${order.shipping_address.street}, ${order.shipping_address.city}, ${order.shipping_address.state} ${order.shipping_address.zip}, ${order.shipping_address.country}</p>
  ${order.notes ? `<p><strong>Notes:</strong> ${order.notes}</p>` : ""}
  <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin" style="color: #F97316;">Go to Admin Dashboard</a></p>
</body>
</html>
`;

export const emailService = {
  sendOrderConfirmation: async (order: Order): Promise<void> => {
    await transporter.sendMail({
      from: `"GlobalPuppies" <${process.env.EMAIL_FROM}>`,
      to: order.customer_email,
      subject: `Order Confirmed — Tracking #${order.tracking_number} | GlobalPuppies`,
      html: buildOrderConfirmationHtml(order),
    });
  },

  sendAdminNotification: async (order: Order): Promise<void> => {
    await transporter.sendMail({
      from: `"GlobalPuppies System" <${process.env.EMAIL_FROM}>`,
      to: process.env.ADMIN_EMAIL || "bikigodswill25@gmail.com",
      subject: `New Order: ${order.tracking_number} — ${order.customer_name} — ${formatPrice(order.total)}`,
      html: buildAdminNotificationHtml(order),
      replyTo: order.customer_email,
    });
  },
};
