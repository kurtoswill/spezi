-- Supabase Schema for Spezi Application

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT,
    first_name TEXT,
    last_name TEXT,
    email_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    avatar_url TEXT,
    subscription_tier TEXT DEFAULT 'free',
    usage_count INTEGER DEFAULT 0,
    nationality TEXT,
    language_dialect TEXT,
    profession TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login_at TIMESTAMP WITH TIME ZONE
);

-- Create RLS policies for users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to read only their own data
CREATE POLICY "Users can view their own data" 
    ON public.users 
    FOR SELECT 
    USING (auth.uid() = id);

-- Policy to allow users to update only their own data
CREATE POLICY "Users can update their own data" 
    ON public.users 
    FOR UPDATE 
    USING (auth.uid() = id);

-- Create meetings table to store meeting data
CREATE TABLE IF NOT EXISTS public.meetings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT,
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    duration INTEGER, -- in seconds
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for meetings
ALTER TABLE public.meetings ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to read only their own meetings
CREATE POLICY "Users can view their own meetings" 
    ON public.meetings 
    FOR SELECT 
    USING (auth.uid() = user_id);

-- Policy to allow users to insert their own meetings
CREATE POLICY "Users can insert their own meetings" 
    ON public.meetings 
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

-- Policy to allow users to update their own meetings
CREATE POLICY "Users can update their own meetings" 
    ON public.meetings 
    FOR UPDATE 
    USING (auth.uid() = user_id);

-- Policy to allow users to delete their own meetings
CREATE POLICY "Users can delete their own meetings" 
    ON public.meetings 
    FOR DELETE 
    USING (auth.uid() = user_id);

-- Create meeting_analytics table to store analytics for each meeting
CREATE TABLE IF NOT EXISTS public.meeting_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    meeting_id UUID REFERENCES public.meetings(id) ON DELETE CASCADE,
    pace_score DECIMAL,
    tone_score DECIMAL,
    confidence_score DECIMAL,
    grammar_score DECIMAL,
    filler_words_count INTEGER,
    filler_words_details JSONB, -- Store details about specific filler words used
    insights TEXT, -- Store AI-generated insights about the meeting
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for meeting_analytics
ALTER TABLE public.meeting_analytics ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to read only their own meeting analytics
CREATE POLICY "Users can view their own meeting analytics" 
    ON public.meeting_analytics 
    FOR SELECT 
    USING (
        auth.uid() IN (
            SELECT user_id FROM public.meetings WHERE id = meeting_analytics.meeting_id
        )
    );

-- Policy to allow users to insert their own meeting analytics
CREATE POLICY "Users can insert their own meeting analytics" 
    ON public.meeting_analytics 
    FOR INSERT 
    WITH CHECK (
        auth.uid() IN (
            SELECT user_id FROM public.meetings WHERE id = meeting_analytics.meeting_id
        )
    );

-- Policy to allow users to update their own meeting analytics
CREATE POLICY "Users can update their own meeting analytics" 
    ON public.meeting_analytics 
    FOR UPDATE 
    USING (
        auth.uid() IN (
            SELECT user_id FROM public.meetings WHERE id = meeting_analytics.meeting_id
        )
    );

-- Create notifications table to store user notifications
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    topic TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to read only their own notifications
CREATE POLICY "Users can view their own notifications" 
    ON public.notifications 
    FOR SELECT 
    USING (auth.uid() = user_id);

-- Policy to allow users to update only their own notifications
CREATE POLICY "Users can update their own notifications" 
    ON public.notifications 
    FOR UPDATE 
    USING (auth.uid() = user_id);

-- Policy to allow users to delete their own notifications
CREATE POLICY "Users can delete their own notifications" 
    ON public.notifications 
    FOR DELETE 
    USING (auth.uid() = user_id);

-- Create user_recording_preferences table to store user preferences for recording
CREATE TABLE IF NOT EXISTS public.user_recording_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    track_pacing BOOLEAN DEFAULT TRUE,
    track_tone BOOLEAN DEFAULT TRUE,
    track_filler_words BOOLEAN DEFAULT TRUE,
    track_grammar BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for user_recording_preferences
ALTER TABLE public.user_recording_preferences ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to read only their own recording preferences
CREATE POLICY "Users can view their own recording preferences" 
    ON public.user_recording_preferences 
    FOR SELECT 
    USING (auth.uid() = user_id);

-- Policy to allow users to update only their own recording preferences
CREATE POLICY "Users can update their own recording preferences" 
    ON public.user_recording_preferences 
    FOR UPDATE 
    USING (auth.uid() = user_id);

-- Create user_integrations table to store user integrations with external services
CREATE TABLE IF NOT EXISTS public.user_integrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    service_name TEXT NOT NULL, -- 'google_meet', 'zoom', 'ms_teams'
    is_connected BOOLEAN DEFAULT FALSE,
    access_token TEXT,
    refresh_token TEXT,
    token_expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for user_integrations
ALTER TABLE public.user_integrations ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to read only their own integrations
CREATE POLICY "Users can view their own integrations" 
    ON public.user_integrations 
    FOR SELECT 
    USING (auth.uid() = user_id);

-- Policy to allow users to update only their own integrations
CREATE POLICY "Users can update their own integrations" 
    ON public.user_integrations 
    FOR UPDATE 
    USING (auth.uid() = user_id);

-- Create subscription_tiers table to store information about different subscription tiers
CREATE TABLE IF NOT EXISTS public.subscription_tiers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL,
    features JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default subscription tiers
INSERT INTO public.subscription_tiers (id, name, description, price, features)
VALUES 
    ('free', 'Free Tier', 'Basic features with limited usage', 0, '{"usage_limit": 5, "basic_analytics": true, "advanced_analytics": false, "ai_model": "basic"}'),
    ('pro', 'Pro Tier', 'Advanced features with unlimited usage', 9.99, '{"usage_limit": null, "basic_analytics": true, "advanced_analytics": true, "ai_model": "advanced"}')
ON CONFLICT (id) DO NOTHING;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to automatically update the updated_at column
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON public.users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_meetings_updated_at
BEFORE UPDATE ON public.meetings
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_meeting_analytics_updated_at
BEFORE UPDATE ON public.meeting_analytics
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscription_tiers_updated_at
BEFORE UPDATE ON public.subscription_tiers
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Create function to handle user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, email_verified, created_at, updated_at)
    VALUES (NEW.id, NEW.email, NEW.email_confirmed_at IS NOT NULL, NEW.created_at, NEW.updated_at);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create a user record when a new auth.users record is created
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

-- Create function to handle user email verification
CREATE OR REPLACE FUNCTION public.handle_user_email_verification()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.email_confirmed_at IS NOT NULL AND OLD.email_confirmed_at IS NULL THEN
        UPDATE public.users
        SET email_verified = TRUE
        WHERE id = NEW.id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically update email_verified when a user verifies their email
CREATE TRIGGER on_auth_user_email_verified
AFTER UPDATE ON auth.users
FOR EACH ROW
WHEN (NEW.email_confirmed_at IS NOT NULL AND OLD.email_confirmed_at IS NULL)
EXECUTE FUNCTION public.handle_user_email_verification();