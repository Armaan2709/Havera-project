create extension if not exists "uuid-ossp";

create table if not exists products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  price numeric not null,
  category text,
  burn_time text,
  image_url text,
  description text,
  created_at timestamp default now()
);

-- Disable Row Level Security for products table to allow insert access
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
