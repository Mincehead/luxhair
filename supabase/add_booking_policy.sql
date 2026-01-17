-- Add missing UPDATE policy for bookings
create policy "Admins can update bookings" on public.bookings
  for update
  using (
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and role = 'admin'
    )
  );

-- Verify it exists
select * from pg_policies where tablename = 'bookings';
