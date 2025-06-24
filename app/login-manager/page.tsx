"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Users, Loader2, AlertCircle, CheckCircle, ArrowRight, Key } from 'lucide-react'
import Image from 'next/image'

export default function ManagerLoginPage() {
  const [email, setEmail] = useState('dabbkara903@gmail.com')
  const [password, setPassword] = useState('12345678Kd')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState('')
  const [showSetup, setShowSetup] = useState(false)
  const [showReset, setShowReset] = useState(false)
  const [resetSent, setResetSent] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)
  const { signIn, signInWithGoogle, user, signOut, resetPassword } = useAuth()
  const router = useRouter()

  // Check if user is already logged in
  useEffect(() => {
    // Prevent sign-out loop
    if (user && !isSigningOut) {
      // If user is a manager, redirect to the dashboard
      if (user.user_metadata?.role === 'manager') {
        router.push('/dashboard/manager')
      } else {
        // If a non-manager is logged in, sign them out to allow manager login
        setIsSigningOut(true)
        signOut()
      }
    }
  }, [user, router, signOut, isSigningOut])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data, error } = await signIn(email, password)
      
      if (error) {
        console.log('Login error:', error) // Debug log
        if (error.includes('Invalid login credentials') || error.includes('Email not confirmed')) {
          setError('Account not found or not confirmed. Please sign up first or check your email for verification.')
          setShowSetup(true)
        } else if (error.includes('Invalid login credentials')) {
          setError('Incorrect password. Try resetting your password.')
          setShowReset(true)
        } else {
          setError(error)
        }
        return
      }

      // Redirect to manager dashboard
      router.push('/dashboard/manager')
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setGoogleLoading(true)
    setError('')

    try {
      const { data, error } = await signInWithGoogle()
      
      if (error) {
        setError(error)
        return
      }

      // Google OAuth will redirect automatically
      console.log('Google sign-in initiated')
    } catch (err: any) {
      setError(err.message || 'Google sign-in failed')
    } finally {
      setGoogleLoading(false)
    }
  }

  const handleQuickLogin = async () => {
    setLoading(true)
    setError('')

    try {
      const { data, error } = await signIn('dabbkara903@gmail.com', '12345678Kd')
      
      if (error) {
        console.log('Quick login error:', error) // Debug log
        if (error.includes('Invalid login credentials') || error.includes('Email not confirmed')) {
          setError('Account not found. Please sign up first.')
          setShowSetup(true)
        } else {
          setError(error)
        }
        return
      }

      router.push('/dashboard/manager')
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateAccount = () => {
    router.push('/signup')
  }

  const handleResetPassword = async () => {
    setLoading(true)
    setError('')

    try {
      const { error } = await resetPassword('dabbkara903@gmail.com')
      
      if (error) {
        setError(error)
        return
      }

      setResetSent(true)
      setError('')
    } catch (err: any) {
      setError(err.message || 'Password reset failed')
    } finally {
      setLoading(false)
    }
  }

  const handleQuickAccess = () => {
    console.log('Quick access button clicked')
    // For immediate access during development
    localStorage.setItem('managerAccess', 'true')
    console.log('Manager access set in localStorage')
    
    // Add a small delay to ensure localStorage is set
    setTimeout(() => {
      console.log('Redirecting to manager dashboard...')
      // Force redirect to manager dashboard
      window.location.href = '/dashboard/manager'
    }, 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/Launchlogo.png"
              alt="LaunchPath Logo"
              width={128}
              height={64}
              className="h-16 max-h-16 w-auto object-contain"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Manager Access</CardTitle>
          <CardDescription>
            Sign in to access the manager dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {resetSent && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Password reset email sent to dabbkara903@gmail.com
              </AlertDescription>
            </Alert>
          )}

          {showSetup && (
            <Alert className="border-blue-200 bg-blue-50">
              <CheckCircle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>Account Setup Required</strong><br />
                You need to create your manager account first. Click "Create Account" below.
              </AlertDescription>
            </Alert>
          )}

          {/* Google Sign-In Button */}
          <Button 
            onClick={handleGoogleLogin}
            variant="outline" 
            className="w-full h-12 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 font-medium"
            disabled={googleLoading}
          >
            {googleLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in with Google...
              </>
            ) : (
              <>
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </>
            )}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or</span>
            </div>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-teal-600 hover:bg-teal-700"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <Users className="mr-2 h-4 w-4" />
                  Sign In
                </>
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or</span>
            </div>
          </div>

          <Button 
            onClick={handleQuickLogin}
            variant="outline" 
            className="w-full"
            disabled={loading}
          >
            Quick Login (dabbkara903@gmail.com)
          </Button>

          {/* Development Quick Access */}
          <Button 
            onClick={handleQuickAccess}
            variant="outline" 
            className="w-full border-green-200 text-green-700 hover:bg-green-50"
          >
            🚀 Quick Access (Development)
          </Button>

          {showReset && (
            <Button 
              onClick={handleResetPassword}
              variant="outline" 
              className="w-full border-orange-200 text-orange-700 hover:bg-orange-50"
              disabled={loading}
            >
              <Key className="mr-2 h-4 w-4" />
              Reset Password
            </Button>
          )}

          <div className="text-center space-y-3">
            <div className="text-sm text-gray-600">
              <p className="mb-2">Don't have an account yet?</p>
              <Button 
                onClick={handleCreateAccount}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <ArrowRight className="mr-2 h-4 w-4" />
                Create Manager Account
              </Button>
            </div>
            
            <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
              <p><strong>Recommended:</strong></p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Use "Continue with Google" for easiest access</li>
                <li>No password needed</li>
                <li>Automatic verification</li>
                <li>Instant manager access</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 