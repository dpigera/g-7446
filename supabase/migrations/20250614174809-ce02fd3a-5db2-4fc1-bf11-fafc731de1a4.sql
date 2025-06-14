
-- Add theme column to projects table to store the selected template
ALTER TABLE public.projects 
ADD COLUMN theme TEXT DEFAULT 'vibrant';
