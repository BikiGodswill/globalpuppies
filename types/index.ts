export interface Puppy {
  id: string;
  name: string;
  breed: string;
  age_weeks: number;
  price: number;
  gender: "Male" | "Female";
  color: string;
  weight_lbs: number;
  description: string;
  image_url: string;
  is_available: boolean;
  is_vaccinated: boolean;
  is_microchipped: boolean;
  health_certificate: boolean;
  registration: string;
  temperament: string[];
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  puppy: Puppy;
  quantity: number;
}

export interface Order {
  id: string;
  tracking_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: ShippingAddress;
  items: OrderItem[];
  subtotal: number;
  shipping_cost: number;
  total: number;
  payment_method: "paypal" | "crypto" | "card";
  payment_status: "pending" | "paid" | "failed";
  order_status: OrderStatus;
  tracking_updates: TrackingUpdate[];
  notes?: string;
  created_at: string;
  updated_at: string;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "in_transit"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  puppy_id: string;
  puppy_name: string;
  breed: string;
  price: number;
  quantity: number;
  image_url: string;
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface TrackingUpdate {
  id: string;
  status: OrderStatus;
  message: string;
  location?: string;
  timestamp: string;
}

export interface AdminUser {
  email: string;
  role: "admin";
}

export interface CheckoutFormData {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  payment_method: "paypal" | "crypto" | "card";
  notes?: string;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}
