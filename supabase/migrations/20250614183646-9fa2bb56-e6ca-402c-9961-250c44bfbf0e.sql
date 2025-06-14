
-- Create a table to log email sends
CREATE TABLE public.email_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL,
  user_id UUID NOT NULL,
  user_email TEXT NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'sent'
);

-- Add Row Level Security (RLS)
ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;

-- Create policy that allows project owners to view email logs for their projects
CREATE POLICY "Project owners can view email logs for their projects" 
  ON public.email_logs 
  FOR SELECT 
  USING (
    project_id IN (
      SELECT id FROM public.projects WHERE user_id = auth.uid()
    )
  );

-- Create policy that allows project owners to insert email logs for their projects
CREATE POLICY "Project owners can create email logs for their projects" 
  ON public.email_logs 
  FOR INSERT 
  WITH CHECK (
    project_id IN (
      SELECT id FROM public.projects WHERE user_id = auth.uid()
    )
  );
