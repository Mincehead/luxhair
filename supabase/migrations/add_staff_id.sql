-- Add staff_id to bookings
alter table public.bookings 
add column staff_id uuid references public.profiles(id);

-- Update RLS for profiles if needed (public profiles are already viewable)
-- We might want a specific policy for 'staff' view if we wanted to hide regular users, 
-- but for now 'Public profiles are viewable by everyone' covers it.

-- Index for performance
create index bookings_staff_id_idx on public.bookings(staff_id);
