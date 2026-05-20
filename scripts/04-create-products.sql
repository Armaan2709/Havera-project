-- 1. Create Products Table
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price numeric not null,
  image_url text,
  description text,
  category text,
  burn_time text,
  created_at timestamp with time zone default now()
);

-- 2. Disable Row Level Security for Development Speed (OPTIONAL, NOT IDEAL FOR PROD)
-- This ensures insert/select works instantly for testing without policies
ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;
