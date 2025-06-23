"use client"

import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { hasManagerAccess, hasQuickAccess } from "@/lib/manager-auth"
import {
  Bell,
  CircleUser,
  CreditCard,
  Settings,
  LogOut,
  LifeBuoy,
  Users,
  Building,
  User
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    // Check for quick access first for development
    if (process.env.NODE_ENV === 'development' && localStorage.getItem('managerAccess') === 'true') {
      setUserRole('manager')
      return
    }

    if (user) {
      // Get user role from metadata for regular users
      const role = user.user_metadata?.role || 'client'
      setUserRole(role)
    } else {
      // If no user and no quick access, redirect
      router.push('/login')
    }
  }, [user, router])

  const handleSignOut = async () => {
    // Also clear the quick access flag on sign out
    if (process.env.NODE_ENV === 'development') {
      localStorage.removeItem('managerAccess')
    }
    await signOut()
    router.push('/')
  }

  const getDashboardLink = () => {
    switch (userRole) {
      case 'manager':
        return '/dashboard/manager'
      case 'student':
        return '/dashboard/student'
      case 'client':
        return '/dashboard/client'
      default:
        return '/dashboard/client'
    }
  }

  const getRoleIcon = () => {
    switch (userRole) {
      case 'manager':
        return <Users className="h-4 w-4" />
      case 'student':
        return <User className="h-4 w-4" />
      case 'client':
        return <Building className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const getRoleName = () => {
    switch (userRole) {
      case 'manager':
        return 'Manager'
      case 'student':
        return 'Student'
      case 'client':
        return 'Client'
      default:
        return 'User'
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-50/50">
       <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-white px-4 md:px-8 z-50">
        <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image
                src="/images/launchpath-logo.png"
                alt="LaunchPath Employment"
                width={150}
                height={40}
                className="h-8 w-auto"
            />
        </Link>
        <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Toggle notifications</span>
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                        <Avatar className="h-9 w-9">
                            <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <span className="sr-only">Toggle user menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push(getDashboardLink())}>
                        {getRoleIcon()}
                        <span>{getRoleName()} Dashboard</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <CircleUser className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>Billing</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <LifeBuoy className="mr-2 h-4 w-4" />
                        <span>Support</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </header>
      <main className="flex-1 p-4 sm:px-6 sm:py-8 lg:px-8">
        {children}
      </main>
    </div>
  )
} 