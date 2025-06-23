"use client"

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react'

export default function SetupCheckPage() {
  const [checks, setChecks] = useState({
    supabaseConfig: false,
    supabaseConnection: false,
    authEnabled: false,
    loading: true
  })
  const [error, setError] = useState('')

  useEffect(() => {
    runChecks()
  }, [])

  const runChecks = async () => {
    setChecks(prev => ({ ...prev, loading: true }))
    
    try {
      // Check 1: Supabase Configuration
      const hasConfig = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
      setChecks(prev => ({ ...prev, supabaseConfig: hasConfig }))

      if (!hasConfig) {
        setError('Missing Supabase environment variables')
        setChecks(prev => ({ ...prev, loading: false }))
        return
      }

      // Check 2: Supabase Connection
      try {
        const { data, error } = await supabase.from('profiles').select('count').limit(1)
        setChecks(prev => ({ ...prev, supabaseConnection: !error }))
      } catch (err) {
        setChecks(prev => ({ ...prev, supabaseConnection: false }))
      }

      // Check 3: Auth Enabled
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setChecks(prev => ({ ...prev, authEnabled: true }))
      } catch (err) {
        setChecks(prev => ({ ...prev, authEnabled: false }))
      }

    } catch (err: any) {
      setError(err.message)
    } finally {
      setChecks(prev => ({ ...prev, loading: false }))
    }
  }

  const allChecksPassed = checks.supabaseConfig && checks.supabaseConnection && checks.authEnabled

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl">Setup Check</CardTitle>
          <CardDescription>
            Verifying your configuration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {checks.loading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          )}

          {!checks.loading && (
            <>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  {checks.supabaseConfig ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                  <span className={checks.supabaseConfig ? 'text-green-700' : 'text-red-700'}>
                    Supabase Configuration
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  {checks.supabaseConnection ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                  <span className={checks.supabaseConnection ? 'text-green-700' : 'text-red-700'}>
                    Database Connection
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  {checks.authEnabled ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                  <span className={checks.authEnabled ? 'text-green-700' : 'text-red-700'}>
                    Authentication
                  </span>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {allChecksPassed && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    All checks passed! Your setup is ready.
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Button 
                  onClick={runChecks} 
                  className="w-full"
                  variant="outline"
                >
                  Run Checks Again
                </Button>
                
                {allChecksPassed && (
                  <Button 
                    onClick={() => window.location.href = '/login-manager'} 
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Go to Manager Login
                  </Button>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 