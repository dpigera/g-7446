
-- Create a table for projects
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) to ensure users can only see their own projects
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create policy that allows users to SELECT their own projects
CREATE POLICY "Users can view their own projects" 
  ON public.projects 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy that allows users to INSERT their own projects
CREATE POLICY "Users can create their own projects" 
  ON public.projects 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy that allows users to UPDATE their own projects
CREATE POLICY "Users can update their own projects" 
  ON public.projects 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create policy that allows users to DELETE their own projects
CREATE POLICY "Users can delete their own projects" 
  ON public.projects 
  FOR DELETE 
  USING (auth.uid() = user_id);
