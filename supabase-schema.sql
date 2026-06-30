-- ============================================================
-- GlobalPuppies Supabase Schema
-- Run this in Supabase SQL Editor to set up your database
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- PUPPIES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS puppies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  breed TEXT NOT NULL,
  age_weeks INTEGER NOT NULL DEFAULT 8,
  price DECIMAL(10,2) NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('Male', 'Female')),
  color TEXT NOT NULL,
  weight_lbs DECIMAL(5,2) NOT NULL DEFAULT 2.0,
  description TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  is_available BOOLEAN NOT NULL DEFAULT true,
  is_vaccinated BOOLEAN NOT NULL DEFAULT true,
  is_microchipped BOOLEAN NOT NULL DEFAULT false,
  health_certificate BOOLEAN NOT NULL DEFAULT false,
  registration TEXT NOT NULL DEFAULT 'AKC',
  temperament TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- ORDERS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tracking_number TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  shipping_address JSONB NOT NULL,
  items JSONB NOT NULL DEFAULT '[]',
  subtotal DECIMAL(10,2) NOT NULL,
  shipping_cost DECIMAL(10,2) NOT NULL DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('paypal', 'crypto', 'card')),
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
  order_status TEXT NOT NULL DEFAULT 'pending' CHECK (order_status IN ('pending','confirmed','preparing','in_transit','out_for_delivery','delivered','cancelled')),
  tracking_updates JSONB NOT NULL DEFAULT '[]',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- STORAGE BUCKET for puppy images
-- ============================================================
-- Run in Supabase Dashboard > Storage > New Bucket
-- Name: puppy-images
-- Public: true

-- ============================================================
-- RLS POLICIES (disable for simplicity, enable in production)
-- ============================================================
ALTER TABLE puppies DISABLE ROW LEVEL SECURITY;
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;

-- ============================================================
-- TRIGGERS for updated_at
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language plpgsql;

CREATE TRIGGER puppies_updated_at BEFORE UPDATE ON puppies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
