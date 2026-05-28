-- Run this in the Supabase SQL editor for your project

-- Contact form submissions
create table if not exists contact_submissions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  message text not null,
  read boolean default false,
  created_at timestamptz default now()
);

-- Team members (players + coaches)
create table if not exists team_members (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  role text not null,
  category text not null check (category in ('player', 'coach')),
  description text,
  photo_url text,
  display_order integer default 0,
  active boolean default true,
  created_at timestamptz default now()
);

-- Gallery images
create table if not exists gallery_images (
  id uuid default gen_random_uuid() primary key,
  url text not null,
  alt_sr text,
  alt_en text,
  display_order integer default 0,
  created_at timestamptz default now()
);

-- Tournaments & events
create table if not exists tournaments (
  id uuid default gen_random_uuid() primary key,
  name_sr text not null,
  name_en text,
  badge_sr text,
  badge_en text,
  description_sr text,
  description_en text,
  category text check (category in ('professional', 'mens', 'womens', 'mix')),
  event_date date,
  active boolean default true,
  display_order integer default 0,
  created_at timestamptz default now()
);

-- RLS: only authenticated users can read/write
alter table contact_submissions enable row level security;
alter table team_members enable row level security;
alter table gallery_images enable row level security;
alter table tournaments enable row level security;

-- Allow authenticated users full access
create policy "auth_all" on contact_submissions for all using (auth.role() = 'authenticated');
create policy "auth_all" on team_members for all using (auth.role() = 'authenticated');
create policy "auth_all" on gallery_images for all using (auth.role() = 'authenticated');
create policy "auth_all" on tournaments for all using (auth.role() = 'authenticated');

-- Public read for team_members, gallery_images, tournaments (shown on the public site)
create policy "public_read_teams" on team_members for select using (active = true);
create policy "public_read_gallery" on gallery_images for select using (true);
create policy "public_read_tournaments" on tournaments for select using (active = true);

-- Storage bucket for gallery uploads
insert into storage.buckets (id, name, public) values ('gallery', 'gallery', true)
  on conflict (id) do nothing;

create policy "public_read_gallery_storage" on storage.objects
  for select using (bucket_id = 'gallery');

create policy "auth_upload_gallery" on storage.objects
  for insert with check (bucket_id = 'gallery' and auth.role() = 'authenticated');

create policy "auth_delete_gallery" on storage.objects
  for delete using (bucket_id = 'gallery' and auth.role() = 'authenticated');
