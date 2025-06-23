const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  console.log('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupDatabase() {
  console.log('Setting up database tables...')

  try {
    // Create profiles table
    console.log('Creating profiles table...')
    const { error: profilesError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS profiles (
          id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
          full_name TEXT,
          email TEXT UNIQUE,
          role TEXT CHECK (role IN ('client', 'student', 'admin', 'manager')) DEFAULT 'student',
          company TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    })

    if (profilesError) {
      console.log('Profiles table error (might already exist):', profilesError.message)
    } else {
      console.log('✅ Profiles table created')
    }

    // Create groups table
    console.log('Creating groups table...')
    const { error: groupsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS groups (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name TEXT NOT NULL,
          description TEXT,
          status TEXT CHECK (status IN ('active', 'inactive', 'completed')) DEFAULT 'active',
          max_members INTEGER DEFAULT 10,
          manager_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    })

    if (groupsError) {
      console.log('Groups table error (might already exist):', groupsError.message)
    } else {
      console.log('✅ Groups table created')
    }

    // Create group_members table
    console.log('Creating group_members table...')
    const { error: membersError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS group_members (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
          user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
          role TEXT CHECK (role IN ('client', 'student', 'admin', 'manager')) DEFAULT 'student',
          joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          UNIQUE(group_id, user_id)
        );
      `
    })

    if (membersError) {
      console.log('Group members table error (might already exist):', membersError.message)
    } else {
      console.log('✅ Group members table created')
    }

    // Create RLS policies
    console.log('Setting up RLS policies...')
    
    // Enable RLS on all tables
    await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;'
    })
    await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE groups ENABLE ROW LEVEL SECURITY;'
    })
    await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;'
    })

    // Profiles policies
    await supabase.rpc('exec_sql', {
      sql: `
        DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
        CREATE POLICY "Users can view own profile" ON profiles
          FOR SELECT USING (auth.uid() = id);
      `
    })

    await supabase.rpc('exec_sql', {
      sql: `
        DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
        CREATE POLICY "Users can update own profile" ON profiles
          FOR UPDATE USING (auth.uid() = id);
      `
    })

    await supabase.rpc('exec_sql', {
      sql: `
        DROP POLICY IF EXISTS "Managers can view all profiles" ON profiles;
        CREATE POLICY "Managers can view all profiles" ON profiles
          FOR SELECT USING (
            EXISTS (
              SELECT 1 FROM profiles 
              WHERE id = auth.uid() AND role = 'manager'
            )
          );
      `
    })

    // Groups policies
    await supabase.rpc('exec_sql', {
      sql: `
        DROP POLICY IF EXISTS "Managers can manage their groups" ON groups;
        CREATE POLICY "Managers can manage their groups" ON groups
          FOR ALL USING (manager_id = auth.uid());
      `
    })

    await supabase.rpc('exec_sql', {
      sql: `
        DROP POLICY IF EXISTS "Users can view groups they belong to" ON groups;
        CREATE POLICY "Users can view groups they belong to" ON groups
          FOR SELECT USING (
            EXISTS (
              SELECT 1 FROM group_members 
              WHERE group_id = groups.id AND user_id = auth.uid()
            )
          );
      `
    })

    // Group members policies
    await supabase.rpc('exec_sql', {
      sql: `
        DROP POLICY IF EXISTS "Group managers can manage members" ON group_members;
        CREATE POLICY "Group managers can manage members" ON group_members
          FOR ALL USING (
            EXISTS (
              SELECT 1 FROM groups 
              WHERE id = group_members.group_id AND manager_id = auth.uid()
            )
          );
      `
    })

    await supabase.rpc('exec_sql', {
      sql: `
        DROP POLICY IF EXISTS "Users can view their memberships" ON group_members;
        CREATE POLICY "Users can view their memberships" ON group_members
          FOR SELECT USING (user_id = auth.uid());
      `
    })

    console.log('✅ RLS policies created')

    // Create manager account
    console.log('Creating manager account...')
    const managerEmail = 'dabbkara903@gmail.com'
    const managerPassword = '12345678Kd'

    // Check if manager already exists
    const { data: existingManager } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', managerEmail)
      .single()

    if (existingManager) {
      console.log('✅ Manager account already exists')
    } else {
      // Create auth user
      const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
        email: managerEmail,
        password: managerPassword,
        email_confirm: true
      })

      if (authError) {
        console.log('Auth user creation error (might already exist):', authError.message)
      } else {
        // Create profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authUser.user.id,
            full_name: 'System Manager',
            email: managerEmail,
            role: 'manager'
          })

        if (profileError) {
          console.log('Profile creation error:', profileError.message)
        } else {
          console.log('✅ Manager account created')
        }
      }
    }

    // Insert sample data
    console.log('Creating sample data...')
    
    // Sample users
    const sampleUsers = [
      {
        id: '11111111-1111-1111-1111-111111111111',
        full_name: 'John Student',
        email: 'john.student@example.com',
        role: 'student'
      },
      {
        id: '22222222-2222-2222-2222-222222222222',
        full_name: 'Sarah Client',
        email: 'sarah.client@example.com',
        role: 'client',
        company: 'Tech Corp'
      },
      {
        id: '33333333-3333-3333-3333-333333333333',
        full_name: 'Mike Developer',
        email: 'mike.dev@example.com',
        role: 'student'
      },
      {
        id: '44444444-4444-4444-4444-444444444444',
        full_name: 'Lisa Manager',
        email: 'lisa.manager@example.com',
        role: 'client',
        company: 'Design Studio'
      }
    ]

    for (const user of sampleUsers) {
      const { error } = await supabase
        .from('profiles')
        .upsert(user, { onConflict: 'id' })
      
      if (error) {
        console.log(`Sample user ${user.email} error (might already exist):`, error.message)
      }
    }

    // Sample groups
    const sampleGroups = [
      {
        id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        name: 'Web Development Team',
        description: 'Frontend and backend developers working on the main website',
        status: 'active',
        max_members: 8,
        manager_id: existingManager?.id || 'quick-access-manager'
      },
      {
        id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        name: 'Design Team',
        description: 'UI/UX designers and creative professionals',
        status: 'active',
        max_members: 5,
        manager_id: existingManager?.id || 'quick-access-manager'
      },
      {
        id: 'cccccccc-cccc-cccc-cccc-cccccccccccc',
        name: 'Marketing Team',
        description: 'Digital marketing and content creation',
        status: 'inactive',
        max_members: 6,
        manager_id: existingManager?.id || 'quick-access-manager'
      }
    ]

    for (const group of sampleGroups) {
      const { error } = await supabase
        .from('groups')
        .upsert(group, { onConflict: 'id' })
      
      if (error) {
        console.log(`Sample group ${group.name} error (might already exist):`, error.message)
      }
    }

    // Sample group members
    const sampleMembers = [
      {
        group_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        user_id: '11111111-1111-1111-1111-111111111111',
        role: 'student'
      },
      {
        group_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        user_id: '22222222-2222-2222-2222-222222222222',
        role: 'client'
      },
      {
        group_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        user_id: '33333333-3333-3333-3333-333333333333',
        role: 'student'
      },
      {
        group_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        user_id: '44444444-4444-4444-4444-444444444444',
        role: 'client'
      },
      {
        group_id: 'cccccccc-cccc-cccc-cccc-cccccccccccc',
        user_id: '11111111-1111-1111-1111-111111111111',
        role: 'student'
      }
    ]

    for (const member of sampleMembers) {
      const { error } = await supabase
        .from('group_members')
        .upsert(member, { onConflict: 'group_id,user_id' })
      
      if (error) {
        console.log(`Sample member error (might already exist):`, error.message)
      }
    }

    console.log('✅ Sample data created')

    console.log('\n🎉 Database setup completed successfully!')
    console.log('\nManager credentials:')
    console.log('Email: dabbkara903@gmail.com')
    console.log('Password: 12345678Kd')
    console.log('\nYou can now use the manager interface with full functionality.')

  } catch (error) {
    console.error('❌ Database setup failed:', error)
    process.exit(1)
  }
}

setupDatabase() 