-- ============================================================
-- প্রযুক্তি পাতা — Supabase Schema
-- Run this in the Supabase SQL Editor
-- ============================================================

-- ─── Extensions ──────────────────────────────────────────────
-- ============================================================
-- প্রযুক্তি পাতা — Supabase Schema
-- Run this in the Supabase SQL Editor
-- ============================================================

-- ─── Extensions ──────────────────────────────────────────────

-- ─── Profiles ────────────────────────────────────────────────
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  username    text unique,
  full_name   text,
  avatar_url  text,
  bio         text,
  website     text,
  created_at  timestamptz default now() not null,
  updated_at  timestamptz default now() not null
);

-- auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, full_name, username)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    lower(regexp_replace(coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email,'@',1)), '\s+', '_', 'g'))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─── Resources ───────────────────────────────────────────────
create table if not exists public.resources (
  id             uuid primary key default gen_random_uuid(),
  title          text not null,
  description    text,
  url            text not null,
  type           text not null check (type in ('ব্লগ','টিউটোরিয়াল','ভিডিও','টুল','বই','কোর্স','অন্যান্য')),
  tags           text[] default '{}',
  thumbnail_url  text,
  user_id        uuid not null references public.profiles(id) on delete cascade,
  created_at     timestamptz default now() not null,
  updated_at     timestamptz default now() not null
);

-- full-text search index (simple, no unaccent to avoid extension issues)
create index if not exists resources_title_search_idx
  on public.resources using gin (to_tsvector('simple', title));

create index if not exists resources_type_idx on public.resources (type);
create index if not exists resources_user_id_idx on public.resources (user_id);
create index if not exists resources_created_at_idx on public.resources (created_at desc);

-- ─── Likes ───────────────────────────────────────────────────
create table if not exists public.likes (
  id           uuid primary key default gen_random_uuid(),
  resource_id  uuid not null references public.resources(id) on delete cascade,
  user_id      uuid not null references public.profiles(id) on delete cascade,
  created_at   timestamptz default now() not null,
  unique (resource_id, user_id)
);

create index if not exists likes_resource_id_idx on public.likes (resource_id);

-- ─── Saves ───────────────────────────────────────────────────
create table if not exists public.saves (
  id           uuid primary key default gen_random_uuid(),
  resource_id  uuid not null references public.resources(id) on delete cascade,
  user_id      uuid not null references public.profiles(id) on delete cascade,
  created_at   timestamptz default now() not null,
  unique (resource_id, user_id)
);

create index if not exists saves_user_id_idx on public.saves (user_id);

-- ─── Comments ────────────────────────────────────────────────
create table if not exists public.comments (
  id           uuid primary key default gen_random_uuid(),
  resource_id  uuid not null references public.resources(id) on delete cascade,
  user_id      uuid not null references public.profiles(id) on delete cascade,
  content      text not null check (char_length(content) >= 2 and char_length(content) <= 2000),
  created_at   timestamptz default now() not null
);

create index if not exists comments_resource_id_idx on public.comments (resource_id);

-- ─── Updated_at trigger ──────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

create trigger set_resources_updated_at before update on public.resources
  for each row execute procedure public.set_updated_at();

create trigger set_profiles_updated_at before update on public.profiles
  for each row execute procedure public.set_updated_at();

-- ─── Row Level Security ──────────────────────────────────────
alter table public.profiles  enable row level security;
alter table public.resources enable row level security;
alter table public.likes     enable row level security;
alter table public.saves     enable row level security;
alter table public.comments  enable row level security;

-- Profiles
create policy "Public profiles are viewable"
  on public.profiles for select using (true);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert with check (auth.uid() = id);

-- Resources
create policy "Resources are public"
  on public.resources for select using (true);

create policy "Authenticated users can insert resources"
  on public.resources for insert with check (auth.uid() = user_id);

create policy "Users can update own resources"
  on public.resources for update using (auth.uid() = user_id);

create policy "Users can delete own resources"
  on public.resources for delete using (auth.uid() = user_id);

-- Likes
create policy "Likes are public"
  on public.likes for select using (true);

create policy "Authenticated users can like"
  on public.likes for insert with check (auth.uid() = user_id);

create policy "Users can unlike"
  on public.likes for delete using (auth.uid() = user_id);

-- Saves
create policy "Users can view own saves"
  on public.saves for select using (auth.uid() = user_id);

create policy "Authenticated users can save"
  on public.saves for insert with check (auth.uid() = user_id);

create policy "Users can unsave"
  on public.saves for delete using (auth.uid() = user_id);

-- Comments
create policy "Comments are public"
  on public.comments for select using (true);

create policy "Authenticated users can comment"
  on public.comments for insert with check (auth.uid() = user_id);

create policy "Users can delete own comments"
  on public.comments for delete using (auth.uid() = user_id);