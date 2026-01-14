-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES (Extends auth.users)
create table public.profiles (
  id uuid references auth.users not null primary key,
  full_name text,
  avatar_url text,
  role text default 'customer' check (role in ('customer', 'admin', 'staff')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS: Profiles
alter table public.profiles enable row level security;
create policy "Public profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can insert their own profile" on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Trigger to handle new user signup
create function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- SERVICES
create table public.services (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  price decimal(10,2) not null,
  duration_min int not null, -- Duration in minutes
  image_url text,
  active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS: Services
alter table public.services enable row level security;
create policy "Services are viewable by everyone" on public.services for select using (true);
create policy "Admins can insert services" on public.services for insert with check (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
create policy "Admins can update services" on public.services for update using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- PRODUCTS
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  price decimal(10,2) not null,
  stock_count int default 0,
  image_url text,
  active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS: Products
alter table public.products enable row level security;
create policy "Products are viewable by everyone" on public.products for select using (true);
create policy "Admins can manage products" on public.products for all using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- BOOKINGS
create table public.bookings (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  service_id uuid references public.services(id) not null,
  start_time timestamp with time zone not null,
  end_time timestamp with time zone not null,
  status text default 'pending' check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS: Bookings
alter table public.bookings enable row level security;
create policy "Users can view own bookings" on public.bookings for select using (auth.uid() = user_id);
create policy "Admins can view all bookings" on public.bookings for select using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
create policy "Users can create bookings" on public.bookings for insert with check (auth.uid() = user_id);

-- ORDERS (E-commerce)
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  total_amount decimal(10,2) not null,
  status text default 'pending' check (status in ('pending', 'paid', 'shipped', 'cancelled')),
  payment_intent_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ORDER ITEMS
create table public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id) not null,
  product_id uuid references public.products(id) not null,
  quantity int not null default 1,
  price_at_purchase decimal(10,2) not null
);

-- RLS: Orders
alter table public.orders enable row level security;
create policy "Users can view own orders" on public.orders for select using (auth.uid() = user_id);
create policy "Admins can view all orders" on public.orders for select using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- REVIEWS
create table public.reviews (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  service_id uuid references public.services(id), -- Nullable if reviewing a product
  product_id uuid references public.products(id), -- Nullable if reviewing a service
  rating int check (rating >= 1 and rating <= 5),
  comment text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS: Reviews
alter table public.reviews enable row level security;
create policy "Reviews are viewable by everyone" on public.reviews for select using (true);
create policy "Authenticated users can create reviews" on public.reviews for insert with check (auth.role() = 'authenticated');
