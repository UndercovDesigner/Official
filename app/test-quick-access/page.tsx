"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, XCircle } from 'lucide-react'
import { hasQuickAccess } from '@/lib/manager-auth'

export default function TestQuickAccessPage() {
  const [managerAccess, setManagerAccess] = useState<boolean>(false)

  useEffect(() => {
    setManagerAccess(hasQuickAccess())
  }, [])

  const enableQuickAccess = () => {
    localStorage.setItem('managerAccess', 'true')
    setManagerAccess(true)
  }

  const disableQuickAccess = () => {
    localStorage.removeItem('managerAccess')
    setManagerAccess(false)
  }

  const goToManagerDashboard = () => {
    window.location.href = '/dashboard/manager'
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Quick Access Test</CardTitle>
          <CardDescription>
            Test the quick access functionality
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            {managerAccess ? (
              <>
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-green-700">Quick Access: ENABLED</span>
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 text-red-600" />
                <span className="text-red-700">Quick Access: DISABLED</span>
              </>
            )}
          </div>

          <div className="space-y-2">
            <Button 
              onClick={enableQuickAccess}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Enable Quick Access
            </Button>

            <Button 
              onClick={disableQuickAccess}
              variant="outline"
              className="w-full"
            >
              Disable Quick Access
            </Button>

            <Button 
              onClick={goToManagerDashboard}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Go to Manager Dashboard
            </Button>
          </div>

          <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
            <p><strong>Instructions:</strong></p>
            <ol className="list-decimal list-inside mt-1 space-y-1">
              <li>Click "Enable Quick Access"</li>
              <li>Click "Go to Manager Dashboard"</li>
              <li>You should have manager access</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 