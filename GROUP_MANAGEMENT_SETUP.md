# Group Management System Setup Guide

## Overview
This system allows managers to create and manage groups, assign users to teams, and control access to dashboards. Users cannot access their dashboards until they are assigned to a group by the manager.

## Manager Authentication
- **Email**: manager@launchpath.com
- **Password**: manager123
- The manager does not need to sign up - they can directly access the manager interface with these credentials.

## How It Works

### 1. User Registration
- Users sign up as either "Student" or "Client"
- After signup, they are redirected to their dashboard
- **They cannot access their dashboard until assigned to a group**

### 2. Manager Interface
The manager dashboard has three main tabs:

#### Groups Tab
- View all created groups
- See group status (active/inactive/completed)
- View member counts
- Manage group members

#### All Users Tab
- See all registered users (students and clients)
- View their assignment status:
  - 🟢 **Assigned**: User is in one or more groups
  - 🟠 **Not Assigned**: User is waiting for group assignment
- Add users to groups directly from this view

#### Group Members Tab
- View members of a selected group
- Add new members to the group
- Remove members from the group
- See member roles (student/client)

### 3. User Experience
- **Before Assignment**: Users see a "Waiting for Team Assignment" screen
- **After Assignment**: Users get a notification and full dashboard access
- **Dashboard Access**: Only granted after manager assigns user to a group

## Database Schema

### Core Tables
- `profiles`: User information (students/clients)
- `groups`: Group definitions
- `group_members`: User-group relationships with roles
- `projects`: Projects within groups
- `tasks`: Tasks within projects

### Key Relationships
- Users can be in multiple groups
- Each group can have multiple projects
- Each project can have multiple tasks
- Tasks are assigned to specific users

## Setup Instructions

### 1. Database Setup
Run the SQL commands in `database-schema-groups.sql` to create the necessary tables.

### 2. Manager Access
The manager can access their interface at `/dashboard/manager` using:
- Email: manager@launchpath.com
- Password: manager123

### 3. User Flow
1. Users sign up at `/signup`
2. They're redirected to their dashboard but see the waiting screen
3. Manager logs in and goes to "All Users" tab
4. Manager clicks "Add" button next to unassigned users
5. Manager selects a group and role for the user
6. User gets notification and dashboard access

## Features

### Manager Features
- ✅ View all registered users
- ✅ See user assignment status
- ✅ Create and manage groups
- ✅ Assign users to groups with specific roles
- ✅ Remove users from groups
- ✅ Monitor group member counts

### User Features
- ✅ Waiting screen when not assigned
- ✅ Notification when added to group
- ✅ Full dashboard access after assignment
- ✅ Role-based dashboard content

### Security
- ✅ Manager authentication required
- ✅ Users cannot access dashboards without group assignment
- ✅ Role-based access control
- ✅ Secure group membership management

## File Structure
```
app/dashboard/
├── manager/page.tsx          # Manager interface
├── student/page.tsx          # Student dashboard
├── client/page.tsx           # Client dashboard
└── layout.tsx               # Dashboard layout with auth

components/ui/
└── notification-banner.tsx   # Notification component

lib/
└── manager-auth.ts          # Manager authentication
```

## Next Steps
- Add email notifications when users are assigned to groups
- Implement real-time updates for group assignments
- Add project and task management features
- Enhance the notification system

## Environment Variables

Add these to your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Manager Configuration

Edit `lib/manager-auth.ts`:

```typescript
export const MANAGER_CREDENTIALS: ManagerCredentials = {
  email: "your-email@example.com", // Replace with your email
  name: "Your Name" // Replace with your name
}
```

## Testing the System

1. Configure your manager email in `lib/manager-auth.ts`
2. Create accounts for different roles (student/client)
3. Log in with your manager credentials
4. Create groups and add users
5. Test the different dashboards
6. Verify that users only see their assigned groups

The system is designed to be scalable and can handle multiple groups, projects, and team members efficiently. 