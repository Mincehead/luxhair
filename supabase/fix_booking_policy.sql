-- Allow admins to update bookings (e.g. to confirm or cancel)
create policy "Admins can update bookings" 
on public.bookings 
for update 
using (
  exists (
    select 1 from public.profiles 
    where id = auth.uid() 
    and role = 'admin'
  )
);
