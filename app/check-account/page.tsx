"use client"

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CheckCircle, XCircle, AlertCircle, Loader2, Search } from 'lucide-react'

export default function CheckAccountPage() {
  const [email, setEmail] = useState('dabbkara903@gmail.com')
  const [loading, setLoading] = useState(false)
  const [accountInfo, setAccountInfo] = useState<any>(null)
  const [error, setError] = useState('')

  const checkAccount = async () => {
    setLoading(true)
    setError('')
    setAccountInfo(null)

    try {
      // Try to get user info from auth
      const { data: { users }, error: authError } = await supabase.auth.admin.listUsers()
      
      if (authError) {
        console.log('Auth error:', authError)
        // Try alternative approach - check if we can sign in
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: 'test123' // Wrong password to test if account exists
        })
        
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            setAccountInfo({
              exists: true,
              verified: false,
              message: 'Account exists but password might be wrong'
            })
          } else if (error.message.includes('Email not confirmed')) {
            setAccountInfo({
              exists: true,
              verified: false,
              message: 'Account exists but email not verified'
            })
          } else {
            setAccountInfo({
              exists: false,
              verified: false,
              message: 'Account not found'
            })
          }
        }
      } else {
        const user = users?.find(u => u.email === email)
        if (user) {
          setAccountInfo({
            exists: true,
            verified: user.email_confirmed_at ? true : false,
            message: user.email_confirmed_at ? 'Account exists and verified' : 'Account exists but not verified',
            user: user
          })
        } else {
          setAccountInfo({
            exists: false,
            verified: false,
            message: 'Account not found'
          })
        }
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl">Account Checker</CardTitle>
          <CardDescription>
            Check if your manager account exists and is verified
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email to check"
            />
          </div>

          <Button 
            onClick={checkAccount}
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Checking...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Check Account
              </>
            )}
          </Button>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {accountInfo && (
            <Alert className={accountInfo.exists ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
              {accountInfo.exists ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <XCircle className="h-4 w-4 text-red-600" />
              )}
              <AlertDescription className={accountInfo.exists ? 'text-green-800' : 'text-red-800'}>
                <strong>{accountInfo.message}</strong>
                {accountInfo.user && (
                  <div className="mt-2 text-sm">
                    <p>Created: {new Date(accountInfo.user.created_at).toLocaleDateString()}</p>
                    <p>Verified: {accountInfo.verified ? 'Yes' : 'No'}</p>
                  </div>
                )}
              </AlertDescription>
            </Alert>
          )}

          <div className="text-center space-y-2">
            <Button 
              onClick={() => window.location.href = '/login-manager'} 
              variant="outline"
              className="w-full"
            >
              Go to Manager Login
            </Button>
            
            <Button 
              onClick={() => window.location.href = '/signup'} 
              variant="outline"
              className="w-full"
            >
              Create New Account
            </Button>
          </div>

          <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
            <p><strong>Common Issues:</strong></p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Email not verified (check your inbox)</li>
              <li>Wrong password</li>
              <li>Account doesn't exist</li>
              <li>Supabase configuration issues</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 