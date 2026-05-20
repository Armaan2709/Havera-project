-- 1. Ensure the users_metadata table exists
CREATE TABLE IF NOT EXISTS public.users_metadata (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    is_admin boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now()
);

-- Allow public read access so the frontend can check if a user is admin
ALTER TABLE public.users_metadata ENABLE ROW LEVEL SECURITY;
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'users_metadata' AND policyname = 'Allow public read access to users_metadata'
    ) THEN
        CREATE POLICY "Allow public read access to users_metadata"
        ON public.users_metadata FOR SELECT
        USING (true);
    END IF;
END $$;

-- 2. Make a specific user an admin
-- IMPORTANT: Change 'your_email@example.com' to the email you signed up with in the app!
DO $$
DECLARE
    target_user_id uuid;
BEGIN
    -- Find the user by email in the Supabase auth schema
    SELECT id INTO target_user_id FROM auth.users WHERE email = 'admin@havera.com'; 
    
    IF target_user_id IS NOT NULL THEN
        -- Insert or update their admin status
        INSERT INTO public.users_metadata (user_id, is_admin)
        VALUES (target_user_id, true)
        ON CONFLICT (user_id) DO UPDATE SET is_admin = true;
    END IF;
END $$;
