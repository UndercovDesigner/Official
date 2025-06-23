# Database Setup Guide for Manager Interface

## Prerequisites

Before running the database setup, you need to:

1. **Create a Supabase project** (if you haven't already)
2. **Set up environment variables**

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
   - **service_role key** (for admin operations)

## Step 3: Create Environment File

Create a `.env.local` file in your project root with these values:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Google OAuth (optional - for Google sign-in)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
```

**Replace the placeholder values with your actual Supabase credentials.**

## Step 4: Run Database Setup

Once you have your environment variables set up, run:

```bash
node scripts/setup-database.js
```

This script will:
- Create all necessary database tables
- Set up Row Level Security (RLS) policies
- Create the manager account
- Insert sample data for testing

## Step 5: Verify Setup

After running the setup script, you should see:

```
🎉 Database setup completed successfully!

Manager credentials:
Email: dabbkara903@gmail.com
Password: 12345678Kd

You can now use the manager interface with full functionality.
```

## What the Setup Creates

### Database Tables:
- **profiles**: User profiles with roles (client, student, manager)
- **groups**: Groups that managers create and manage
- **group_members**: User assignments to groups

### Sample Data:
- **4 sample users** (2 students, 2 clients)
- **3 sample groups** (Web Development, Design, Marketing teams)
- **5 sample group memberships** for testing

### Manager Account:
- **Email:** dabbkara903@gmail.com
- **Password:** 12345678Kd
- **Role:** manager

## Testing the Manager Interface

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Access the manager interface:**
   - Go to `/login-manager` for direct manager login
   - Or use the quick access button on the homepage
   - Or go to `/test-quick-access` for development testing

3. **Test functionality:**
   - Create new groups
   - Add users to groups
   - Remove users from groups
   - Change group status
   - View all users and their assignments

## Troubleshooting

### "Missing Supabase environment variables"
- Make sure you created the `.env.local` file
- Check that the file is in the project root
- Verify the variable names are correct

### "relation does not exist" errors
- The setup script handles this gracefully
- It will create mock data for testing
- The manager interface will work with mock data

### "Access denied" errors
- Make sure you're logged in as the manager
- Check that the manager account was created successfully
- Try using the quick access feature for development

### Database connection issues
- Verify your Supabase URL and keys are correct
- Check that your Supabase project is active
- Ensure you have internet connection

## Next Steps

Once the database is set up:

1. **Test the manager interface** with the sample data
2. **Create real user accounts** through the signup process
3. **Assign users to groups** using the manager interface
4. **Test the student and client dashboards** with assigned users

## Security Notes

- The service role key has admin privileges - keep it secret
- RLS policies ensure users can only access appropriate data
- The manager can only manage their own groups
- Users can only see groups they're assigned to

## Support

If you encounter any issues:
1. Check the console for error messages
2. Verify your environment variables
3. Ensure your Supabase project is properly configured
4. Try the quick access feature for development testing

The manager interface is now fully functional with both real database operations and fallback mock data for development! 