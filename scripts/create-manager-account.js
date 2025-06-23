// Create Manager Account Script
// This script creates the manager account with the specified credentials

const { createClient } = require('@supabase/supabase-js')

// You'll need to add your Supabase credentials here
// Create a .env.local file in your project root with:
// NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
// NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase credentials!')
  console.error('Please create a .env.local file with:')
  console.error('NEXT_PUBLIC_SUPABASE_URL=your_supabase_url')
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function createManagerAccount() {
  try {
    console.log('🔧 Creating manager account...')
    console.log('Email: dabbkara903@gmail.com')
    console.log('Password: 12345678Kd')
    
    const { data, error } = await supabase.auth.signUp({
      email: 'dabbkara903@gmail.com',
      password: '12345678Kd',
      options: {
        data: {
          full_name: 'Karam Manager',
          role: 'manager',
        },
      },
    })

    if (error) {
      if (error.message.includes('already registered')) {
        console.log('✅ Manager account already exists!')
        console.log('You can now log in with:')
        console.log('Email: dabbkara903@gmail.com')
        console.log('Password: 12345678Kd')
      } else {
        console.error('❌ Error creating manager account:', error.message)
      }
      return
    }

    console.log('✅ Manager account created successfully!')
    console.log('📧 Email: dabbkara903@gmail.com')
    console.log('🔑 Password: 12345678Kd')
    console.log('\n🎉 You can now log in to the manager dashboard!')
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

createManagerAccount() 