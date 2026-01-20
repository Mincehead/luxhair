-- Create opening_hours table
create table public.opening_hours (
  id uuid default uuid_generate_v4() primary key,
  day_of_week int not null check (day_of_week between 0 and 6), -- 0=Sunday, 6=Saturday
  open_time time,
  close_time time,
  is_closed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (day_of_week)
);

-- RLS: Opening Hours
alter table public.opening_hours enable row level security;
create policy "Opening hours are viewable by everyone" on public.opening_hours for select using (true);
create policy "Admins can update opening hours" on public.opening_hours for all using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- Seed default data (Mon-Sat 9-5, Sun Closed)
insert into public.opening_hours (day_of_week, open_time, close_time, is_closed) values 
(0, '09:00', '17:00', true),  -- Sunday (Closed)
(1, '09:00', '17:00', false), -- Monday
(2, '09:00', '17:00', false), -- Tuesday
(3, '09:00', '17:00', false), -- Wednesday
(4, '09:00', '17:00', false), -- Thursday
(5, '09:00', '17:00', false), -- Friday
(6, '09:00', '17:00', false); -- Saturday
