
-- 1. Ensure the 'products' bucket exists and is public
insert into storage.buckets (id, name, public)
values ('products', 'products', true)
on conflict (id) do update set public = true;

-- 2. Drop existing policies to avoid conflicts (optional, be careful)
drop policy if exists "Public Access" on storage.objects;
drop policy if exists "Auth Upload" on storage.objects;

-- 3. Allow public read access to 'products' bucket
-- Note: 'storage.objects' is the table where files are tracked
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'products' );

-- 4. Allow authenticated users (admins) to upload/update/delete
create policy "Auth Manage"
  on storage.objects for all
  using ( bucket_id = 'products' and auth.role() = 'authenticated' )
  with check ( bucket_id = 'products' and auth.role() = 'authenticated' );
