-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES TABLE
-- Stores additional user information not handled by Auth
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  user_id uuid references auth.users on delete cascade not null,
  full_name text,
  age integer,
  birthday date,
  school_name text,
  class_name text,
  college_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint profiles_user_id_key unique (user_id)
);

-- USER ROLES TABLE
-- Manages access control (admin, moderator, student)
create table public.user_roles (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  role text check (role in ('admin', 'moderator', 'student')) default 'student',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint user_roles_user_id_key unique (user_id)
);

-- MODULE PROGRESS TABLE
-- Tracks user progress through the 10 learning modules
create table public.module_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  module_id text not null,
  status text check (status in ('locked', 'unlocked', 'in-progress', 'completed')) default 'locked',
  quiz_score integer default 0,
  quiz_completed boolean default false,
  video_watched boolean default false,
  game_completed boolean default false,
  last_accessed timestamp with time zone default timezone('utc'::text, now()),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint module_progress_user_module_unique unique (user_id, module_id)
);

-- Row Level Security (RLS) Policies
-- Secure the data so users can only see their own info

alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.module_progress enable row level security;

-- Profiles Policies
create policy "Users can view own profile" on profiles
  for select using (auth.uid() = user_id);

create policy "Users can update own profile" on profiles
  for update using (auth.uid() = user_id);

create policy "Users can insert own profile" on profiles
  for insert with check (auth.uid() = user_id);

-- User Roles Policies
create policy "Users can view own role" on user_roles
  for select using (auth.uid() = user_id);

-- Module Progress Policies
create policy "Users can view own progress" on module_progress
  for select using (auth.uid() = user_id);

create policy "Users can update own progress" on module_progress
  for update using (auth.uid() = user_id);

create policy "Users can insert own progress" on module_progress
  for insert with check (auth.uid() = user_id);

-- Function to handle new user signup
-- Automatically creates a profile and assigns 'student' role
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, user_id, full_name, avatar_url)
  values (new.id, new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  
  insert into public.user_roles (user_id, role)
  values (new.id, coalesce(new.raw_user_meta_data->>'role', 'student'));
  
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
