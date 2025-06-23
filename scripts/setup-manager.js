// Manager Account Setup Script
// Run this script to create the manager account

const { createClient } = require('@supabase/supabase-js')

// Replace with your Supabase URL and anon key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function createManagerAccount() {
  try {
    console.log('Creating manager account...')
    
    const { data, error } = await supabase.auth.signUp({
      email: 'manager@launchpath.com',
      password: 'manager123',
      options: {
        data: {
          full_name: 'LaunchPath Manager',
          role: 'manager',
        },
      },
    })

    if (error) {
      console.error('Error creating manager account:', error.message)
      return
    }

    console.log('✅ Manager account created successfully!')
    console.log('Email: manager@launchpath.com')
    console.log('Password: manager123')
    console.log('\nYou can now log in to the manager dashboard.')
    
  } catch (error) {
    console.error('Error:', error.message)
  }
}

createManagerAccount() 