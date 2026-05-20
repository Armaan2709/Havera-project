-- Safely create the orders table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.orders (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_email text,
    products jsonb,
    total numeric,
    created_at timestamp with time zone DEFAULT now()
);

-- Safely add columns if the table already existed but was missing them
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS user_email text;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS products jsonb;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS total numeric;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now();

-- Note: The uuid_generate_v4() function requires the "uuid-ossp" extension.
-- If you run into issues, you can uncomment and run this first:
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
