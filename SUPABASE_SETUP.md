# Supabase Setup Guide for LaunchPath

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in the details:
   - **Organization:** Your org (or create one)
   - **Project name:** `launchpath-website`
   - **Database password:** Create a strong password (save this!)
   - **Region:** Choose closest to your users
4. Click "Create new project" and wait 1-2 minutes

## Step 2: Get Your Credentials

1. In your Supabase dashboard, go to **Settings → API**
2. Copy these values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **anon public key** (starts with `eyJ...`)

## Step 3: Update Environment Variables

1. Open the `.env.local` file in your project
2. Replace the placeholder values with your actual credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_here
```

## Step 4: Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the entire contents of `database-schema.sql` from your project
3. Paste it into the SQL Editor
4. Click "Run" to execute the schema

## Step 5: Configure Authentication

1. Go to **Authentication → Settings** in Supabase
2. Under "Site URL", add: `http://localhost:3000`
3. Under "Redirect URLs", add:
   - `http://localhost:3000/dashboard`
   - `http://localhost:3000/login`
   - `http://localhost:3000/signup`

## Step 6: Test the Setup

1. Restart your Next.js development server:
   ```bash
   npm run dev
   ```

2. The application should now be connected to Supabase!

## What's Included in the Schema

The database schema includes:

- **Users/Profiles:** Extended user profiles with roles (client/student)
- **Projects:** Project management with status tracking
- **Tasks:** Task assignment and progress tracking
- **Time Tracking:** Time entry logging for students
- **Messages:** Real-time messaging between team members
- **Files:** Project file management
- **Progress Updates:** Student progress submissions
- **Meetings:** Meeting scheduling and management

## Security Features

- Row Level Security (RLS) enabled on all tables
- Users can only access data for projects they're involved in
- Authentication integrated with Supabase Auth
- Secure file uploads (ready for Supabase Storage)

## Next Steps

Once you've completed this setup, I'll:

1. Connect the login/signup pages to Supabase Auth
2. Replace mock data with real database queries
3. Add real-time features for messaging
4. Implement file upload functionality
5. Add time tracking logic
6. Create admin dashboard features

## Troubleshooting

If you encounter any issues:

1. **Environment variables not loading:** Restart your dev server
2. **Database connection errors:** Check your credentials in `.env.local`
3. **RLS errors:** Make sure you're logged in and have proper permissions
4. **Schema errors:** Check the SQL Editor for any syntax errors

Let me know when you've completed these steps and I'll start implementing the authentication and data integration! 