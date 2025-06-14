
-- Add a column to store the generated wrap captions for each user
ALTER TABLE public.project_users 
ADD COLUMN wrap_captions jsonb;
