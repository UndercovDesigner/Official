// Manager Authentication System
// This file contains the logic to identify and authenticate the manager

export interface ManagerCredentials {
  email: string
  name: string
}

// Replace these with your actual manager credentials
export const MANAGER_CREDENTIALS: ManagerCredentials = {
  email: "dabbkara903@gmail.com", // Replace with your email
  name: "Karam Manager" // Replace with your name
}

export function isManager(user: any): boolean {
  if (!user) {
    // Check for quick access when no user is present
    if (typeof window !== 'undefined') {
      const quickAccess = localStorage.getItem('managerAccess')
      return quickAccess === 'true'
    }
    return false
  }
  
  // Check if user email matches manager email
  // Also check for Google OAuth users
  const userEmail = user.email || user.user_metadata?.email
  return userEmail === MANAGER_CREDENTIALS.email
}

export function getManagerRole(): string {
  return 'manager'
}

// Function to check if current user should have manager access
export function hasManagerAccess(user: any): boolean {
  return isManager(user)
}

// Function to check for quick access specifically
export function hasQuickAccess(): boolean {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('managerAccess') === 'true'
  }
  return false
} 