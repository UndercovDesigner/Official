-- LaunchPath Database Schema with Group Management
-- Run this in your Supabase SQL Editor

-- Create custom types
CREATE TYPE user_role AS ENUM ('client', 'student', 'admin', 'manager');
CREATE TYPE project_status AS ENUM ('draft', 'active', 'completed', 'cancelled');
CREATE TYPE task_status AS ENUM ('pending', 'in_progress', 'completed', 'blocked');
CREATE TYPE message_type AS ENUM ('text', 'file', 'system');
CREATE TYPE group_status AS ENUM ('active', 'inactive', 'completed');

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role user_role NOT NULL DEFAULT 'client',
  company TEXT,
  bio TEXT,
  hourly_rate DECIMAL(10,2),
  skills TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Groups table for manager to create and manage
CREATE TABLE public.groups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  manager_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  status group_status DEFAULT 'active',
  max_members INTEGER DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Group members table
CREATE TABLE public.group_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  role user_role NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(group_id, user_id)
);

-- Projects table (linked to groups)
CREATE TABLE public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  status project_status DEFAULT 'draft',
  budget DECIMAL(10,2),
  start_date DATE,
  due_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Project team members
CREATE TABLE public.project_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  hourly_rate DECIMAL(10,2),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(project_id, user_id)
);

-- Tasks table
CREATE TABLE public.tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE,
  assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  status task_status DEFAULT 'pending',
  priority INTEGER DEFAULT 1,
  estimated_hours DECIMAL(5,2),
  actual_hours DECIMAL(5,2),
  due_date DATE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Time tracking
CREATE TABLE public.time_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  task_id UUID REFERENCES public.tasks(id) ON DELETE CASCADE,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE,
  description TEXT,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages table
CREATE TABLE public.messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  message_type message_type DEFAULT 'text',
  content TEXT,
  file_url TEXT,
  file_name TEXT,
  read_by UUID[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Project files
CREATE TABLE public.project_files (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE,
  uploaded_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  file_type TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Progress updates
CREATE TABLE public.progress_updates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  completion_percentage INTEGER CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
  files TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Meetings table
CREATE TABLE public.meetings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE,
  meeting_url TEXT,
  attendees UUID[] DEFAULT '{}',
  created_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_groups_manager_id ON public.groups(manager_id);
CREATE INDEX idx_groups_status ON public.groups(status);
CREATE INDEX idx_group_members_group_id ON public.group_members(group_id);
CREATE INDEX idx_group_members_user_id ON public.group_members(user_id);
CREATE INDEX idx_projects_group_id ON public.projects(group_id);
CREATE INDEX idx_projects_client_id ON public.projects(client_id);
CREATE INDEX idx_projects_status ON public.projects(status);
CREATE INDEX idx_tasks_group_id ON public.tasks(group_id);
CREATE INDEX idx_tasks_project_id ON public.tasks(project_id);
CREATE INDEX idx_tasks_assigned_to ON public.tasks(assigned_to);
CREATE INDEX idx_tasks_status ON public.tasks(status);
CREATE INDEX idx_time_entries_group_id ON public.time_entries(group_id);
CREATE INDEX idx_time_entries_user_id ON public.time_entries(user_id);
CREATE INDEX idx_time_entries_task_id ON public.time_entries(task_id);
CREATE INDEX idx_messages_group_id ON public.messages(group_id);
CREATE INDEX idx_messages_project_id ON public.messages(project_id);
CREATE INDEX idx_project_members_project_id ON public.project_members(project_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.time_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meetings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for groups
CREATE POLICY "Users can view groups they're members of" ON public.groups
  FOR SELECT USING (
    auth.uid() = manager_id OR 
    auth.uid() IN (
      SELECT user_id FROM public.group_members WHERE group_id = id
    )
  );

CREATE POLICY "Managers can create groups" ON public.groups
  FOR INSERT WITH CHECK (auth.uid() = manager_id);

CREATE POLICY "Managers can update their groups" ON public.groups
  FOR UPDATE USING (auth.uid() = manager_id);

-- RLS Policies for group_members
CREATE POLICY "Users can view group members for groups they're in" ON public.group_members
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM public.group_members WHERE group_id = group_id
    ) OR
    auth.uid() IN (
      SELECT manager_id FROM public.groups WHERE id = group_id
    )
  );

CREATE POLICY "Managers can manage group members" ON public.group_members
  FOR ALL USING (
    auth.uid() IN (
      SELECT manager_id FROM public.groups WHERE id = group_id
    )
  );

-- RLS Policies for projects
CREATE POLICY "Users can view projects in their groups" ON public.projects
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM public.group_members WHERE group_id = group_id
    ) OR
    auth.uid() = client_id OR
    auth.uid() IN (
      SELECT manager_id FROM public.groups WHERE id = group_id
    )
  );

CREATE POLICY "Clients can create projects" ON public.projects
  FOR INSERT WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Clients can update their own projects" ON public.projects
  FOR UPDATE USING (auth.uid() = client_id);

-- RLS Policies for tasks
CREATE POLICY "Users can view tasks in their groups" ON public.tasks
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM public.group_members WHERE group_id = group_id
    ) OR
    auth.uid() IN (
      SELECT manager_id FROM public.groups WHERE id = group_id
    )
  );

-- RLS Policies for messages
CREATE POLICY "Users can view messages in their groups" ON public.messages
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM public.group_members WHERE group_id = group_id
    ) OR
    auth.uid() IN (
      SELECT manager_id FROM public.groups WHERE id = group_id
    )
  );

CREATE POLICY "Users can send messages in their groups" ON public.messages
  FOR INSERT WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM public.group_members WHERE group_id = group_id
    ) OR
    auth.uid() IN (
      SELECT manager_id FROM public.groups WHERE id = group_id
    )
  );

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_groups_updated_at BEFORE UPDATE ON public.groups
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON public.tasks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role, company)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'client'),
    NEW.raw_user_meta_data->>'company'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user(); 