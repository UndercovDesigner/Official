# Google OAuth Setup Guide

## Overview
This guide will help you set up Google OAuth authentication for your LaunchPath manager dashboard.

## Step 1: Create Google OAuth Credentials

### 1. Go to Google Cloud Console
- Visit: https://console.cloud.google.com/
- Create a new project or select an existing one

### 2. Enable Google+ API
- Go to "APIs & Services" > "Library"
- Search for "Google+ API" and enable it

### 3. Create OAuth 2.0 Credentials
- Go to "APIs & Services" > "Credentials"
- Click "Create Credentials" > "OAuth 2.0 Client IDs"
- Choose "Web application"
- Add these Authorized redirect URIs:
  ```
  https://your-project-ref.supabase.co/auth/v1/callback
  http://localhost:3000/auth/callback
  ```
- Copy the **Client ID** and **Client Secret**

## Step 2: Configure Supabase

### 1. Go to Supabase Dashboard
- Visit: https://supabase.com/dashboard
- Select your project

### 2. Configure Authentication
- Go to "Authentication" > "Providers"
- Find "Google" and click "Edit"
- Enable Google provider
- Enter your Google OAuth credentials:
  - **Client ID**: Your Google Client ID
  - **Client Secret**: Your Google Client Secret

### 3. Add Redirect URLs
- Go to "Authentication" > "URL Configuration"
- Add these redirect URLs:
  ```
  http://localhost:3000/dashboard/manager
  https://your-domain.com/dashboard/manager
  ```

## Step 3: Test the Setup

### 1. Start Your Development Server
```bash
npm run dev
```

### 2. Test Google Sign-In
- Go to: `http://localhost:3000/login-manager`
- Click "Continue with Google"
- You should be redirected to Google's OAuth page
- After authentication, you'll be redirected to the manager dashboard

## Troubleshooting

### Common Issues:

1. **"Invalid redirect URI"**
   - Make sure the redirect URI in Google Console matches exactly
   - Include both localhost and production URLs

2. **"Provider not configured"**
   - Check that Google provider is enabled in Supabase
   - Verify Client ID and Secret are correct

3. **"Redirect loop"**
   - Check redirect URLs in Supabase settings
   - Make sure the callback URL is correct

### Quick Test:
1. Go to `/login-manager`
2. Click "Continue with Google"
3. If it works, you'll see Google's login page
4. After login, you'll be redirected to the manager dashboard

## Benefits of Google OAuth:
- ✅ No password needed
- ✅ Automatic email verification
- ✅ Secure authentication
- ✅ Instant access
- ✅ No account creation required

## Next Steps:
Once Google OAuth is working, you can:
1. Log in instantly with your Google account
2. Access the manager dashboard immediately
3. Manage users and groups without any setup issues 