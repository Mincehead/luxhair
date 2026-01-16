-- Replace 'your_email@example.com' with your actual email address
-- Run this in the Supabase SQL Editor

UPDATE public.profiles
SET role = 'admin'
WHERE id = (
  SELECT id FROM auth.users WHERE email = 'your_email@example.com'
);

-- Verify the change
SELECT * FROM public.profiles WHERE role = 'admin';
