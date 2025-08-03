# Supabase Setup for Spezi

This directory contains the database schema and setup instructions for the Supabase backend of the Spezi application.

## Schema Overview

The database schema includes the following tables:

1. **users** - Stores user information including subscription tier and usage tracking
2. **meetings** - Stores information about user meetings
3. **meeting_analytics** - Stores analytics data for each meeting (pace, confidence, grammar, filler words)
4. **subscription_tiers** - Stores information about different subscription tiers (free and pro)

## Row Level Security (RLS)

The schema includes Row Level Security policies to ensure users can only access their own data:

- Users can only view and update their own user data
- Users can only view, insert, update, and delete their own meetings
- Users can only view, insert, and update analytics for their own meetings

## Triggers and Functions

The schema includes several triggers and functions:

- Automatically update `updated_at` timestamps when records are modified
- Automatically create a user record in the `public.users` table when a new `auth.users` record is created
- Automatically update the `email_verified` flag when a user verifies their email

## How to Apply the Schema

### Option 1: Using the Supabase Dashboard

1. Log in to your Supabase dashboard
2. Go to the SQL Editor
3. Create a new query
4. Copy and paste the contents of `schema.sql` into the query editor
5. Run the query

### Option 2: Using the Supabase CLI

1. Install the Supabase CLI if you haven't already:
   ```
   npm install -g supabase
   ```

2. Log in to your Supabase account:
   ```
   supabase login
   ```

3. Link your project:
   ```
   supabase link --project-ref your-project-ref
   ```

4. Apply the schema:
   ```
   supabase db push schema.sql
   ```

## Email Verification

The application includes an email verification page at `/verify-email` that handles the email confirmation link sent by Supabase. When users click the link in their email, they will be directed to this page, which will:

1. Extract the verification token from the URL
2. Verify the email using Supabase's API
3. Show a success message and redirect to the login page
4. Handle any errors that might occur during verification

## Environment Variables

Make sure your `.env.local` file includes the following Supabase environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Testing

To test the email verification flow:

1. Sign up for a new account
2. Check your email for the verification link
3. Click the link and verify that you are redirected to the verification page
4. After successful verification, you should be redirected to the login page
5. You should now be able to log in with your verified email