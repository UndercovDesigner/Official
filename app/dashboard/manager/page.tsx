"use client"

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { hasManagerAccess, hasQuickAccess } from '@/lib/manager-auth'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Users, UserPlus, Settings, Trash2, Edit, Shield, AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'

interface Group {
  id: string
  name: string
  description: string
  status: 'active' | 'inactive' | 'completed'
  max_members: number
  created_at: string
  member_count: number
}

interface User {
  id: string
  full_name: string
  email: string
  role: 'client' | 'student' | 'admin' | 'manager'
  company?: string
}

interface GroupMember {
  id: string
  user_id: string
  role: 'client' | 'student' | 'admin' | 'manager'
  joined_at: string
  user: User
  group?: {
    name: string
  }
}

export default function ManagerDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const [groups, setGroups] = useState<Group[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [groupMembers, setGroupMembers] = useState<GroupMember[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [showAddMember, setShowAddMember] = useState(false)
  const [accessGranted, setAccessGranted] = useState(false)

  // Form states
  const [groupForm, setGroupForm] = useState({
    name: '',
    description: '',
    max_members: 10
  })

  const [memberForm, setMemberForm] = useState({
    user_id: '',
    role: 'student' as 'client' | 'student'
  })

  useEffect(() => {
    // Grant access immediately for quick access mode in development
    if (process.env.NODE_ENV === 'development' && localStorage.getItem('managerAccess') === 'true') {
      setAccessGranted(true)
      loadGroups()
      loadUsers()
      return
    }

    if (user) {
      if (user.user_metadata?.role === 'manager') {
        setAccessGranted(true)
        loadGroups()
        loadUsers()
      } else {
        // Redirect non-managers
        router.push('/dashboard/client')
      }
    } else {
      // If no user and no quick access, redirect to login
      router.push('/login')
    }
  }, [user, router])

  const loadGroups = async () => {
    try {
      // For quick access, use a default manager ID
      const managerId = user?.id || 'quick-access-manager'
      
      const { data, error } = await supabase
        .from('groups')
        .select(`
          *,
          group_members(count)
        `)
        .eq('manager_id', managerId)
        .order('created_at', { ascending: false })

      if (error) {
        console.log('Groups error (expected for quick access):', error)
        // For development, show mock groups if database fails
        if (error.message.includes('relation "groups" does not exist')) {
          const mockGroups: Group[] = [
            {
              id: '1',
              name: 'Web Development Team',
              description: 'Frontend and backend developers working on the main website',
              status: 'active',
              max_members: 8,
              created_at: new Date().toISOString(),
              member_count: 3
            },
            {
              id: '2',
              name: 'Design Team',
              description: 'UI/UX designers and creative professionals',
              status: 'active',
              max_members: 5,
              created_at: new Date(Date.now() - 86400000).toISOString(),
              member_count: 2
            },
            {
              id: '3',
              name: 'Marketing Team',
              description: 'Digital marketing and content creation',
              status: 'inactive',
              max_members: 6,
              created_at: new Date(Date.now() - 172800000).toISOString(),
              member_count: 1
            }
          ]
          setGroups(mockGroups)
          return
        }
        // For quick access, show empty state instead of error
        setGroups([])
        return
      }

      const groupsWithCount = data?.map(group => ({
        ...group,
        member_count: group.group_members?.[0]?.count || 0
      })) || []

      setGroups(groupsWithCount)
    } catch (error) {
      console.error('Error loading groups:', error)
      // Don't show error toast for quick access
      setGroups([])
    }
  }

  const loadUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .in('role', ['client', 'student'])
        .order('full_name')

      if (error) {
        console.log('Users error (expected for quick access):', error)
        // For development, show mock users if database fails
        if (error.message.includes('relation "profiles" does not exist')) {
          const mockUsers: User[] = [
            {
              id: '1',
              full_name: 'John Student',
              email: 'john.student@example.com',
              role: 'student'
            },
            {
              id: '2',
              full_name: 'Sarah Client',
              email: 'sarah.client@example.com',
              role: 'client',
              company: 'Tech Corp'
            },
            {
              id: '3',
              full_name: 'Mike Developer',
              email: 'mike.dev@example.com',
              role: 'student'
            },
            {
              id: '4',
              full_name: 'Lisa Manager',
              email: 'lisa.manager@example.com',
              role: 'client',
              company: 'Design Studio'
            }
          ]
          setUsers(mockUsers)
          setGroupMembers([])
          setLoading(false)
          return
        }
        // For quick access, show empty state instead of error
        setUsers([])
        setGroupMembers([])
        setLoading(false)
        return
      }

      setUsers(data || [])

      // Also load all group memberships to show assignment status
      const { data: allMemberships, error: membershipsError } = await supabase
        .from('group_members')
        .select(`
          *,
          group:groups(name)
        `)

      if (membershipsError) {
        console.log('Memberships error (expected for quick access):', membershipsError)
        setGroupMembers([])
      } else {
        setGroupMembers(allMemberships || [])
      }
    } catch (error) {
      console.error('Error loading users:', error)
      // Don't show error toast for quick access
      setUsers([])
      setGroupMembers([])
    } finally {
      setLoading(false)
    }
  }

  const loadGroupMembers = async (groupId: string) => {
    try {
      const { data, error } = await supabase
        .from('group_members')
        .select(`
          *,
          user:profiles(*)
        `)
        .eq('group_id', groupId)

      if (error) {
        console.log('Group members error (expected for quick access):', error)
        // For development, show mock members if database fails
        if (error.message.includes('relation "group_members" does not exist')) {
          const mockMembers: GroupMember[] = [
            {
              id: '1',
              user_id: '1',
              role: 'student',
              joined_at: new Date().toISOString(),
              user: {
                id: '1',
                full_name: 'John Student',
                email: 'john.student@example.com',
                role: 'student'
              }
            },
            {
              id: '2',
              user_id: '2',
              role: 'client',
              joined_at: new Date(Date.now() - 86400000).toISOString(),
              user: {
                id: '2',
                full_name: 'Sarah Client',
                email: 'sarah.client@example.com',
                role: 'client',
                company: 'Tech Corp'
              }
            }
          ]
          setGroupMembers(mockMembers)
          return
        }
        throw error
      }
      setGroupMembers(data || [])
    } catch (error) {
      console.error('Error loading group members:', error)
      toast.error('Failed to load group members')
    }
  }

  const createGroup = async () => {
    try {
      // For quick access, use a default manager ID
      const managerId = user?.id || 'quick-access-manager'
      
      const { data, error } = await supabase
        .from('groups')
        .insert({
          name: groupForm.name,
          description: groupForm.description,
          max_members: groupForm.max_members,
          manager_id: managerId,
          status: 'active'
        })
        .select()
        .single()

      if (error) {
        console.error('Error creating group:', error)
        // For development, create a mock group if database fails
        if (error.message.includes('relation "groups" does not exist')) {
          const mockGroup: Group = {
            id: Date.now().toString(),
            name: groupForm.name,
            description: groupForm.description,
            max_members: groupForm.max_members,
            status: 'active' as const,
            created_at: new Date().toISOString(),
            member_count: 0
          }
          setGroups(prev => [mockGroup, ...prev])
          toast.success('Group created successfully (mock data)')
          setShowCreateGroup(false)
          setGroupForm({ name: '', description: '', max_members: 10 })
          return
        }
        throw error
      }

      toast.success('Group created successfully')
      setShowCreateGroup(false)
      setGroupForm({ name: '', description: '', max_members: 10 })
      loadGroups()
    } catch (error) {
      console.error('Error creating group:', error)
      toast.error('Failed to create group')
    }
  }

  const addMemberToGroup = async () => {
    if (!selectedGroup || !memberForm.user_id) return

    try {
      const { error } = await supabase
        .from('group_members')
        .insert({
          group_id: selectedGroup.id,
          user_id: memberForm.user_id,
          role: memberForm.role
        })

      if (error) {
        console.error('Error adding member:', error)
        // For development, create mock membership if database fails
        if (error.message.includes('relation "group_members" does not exist')) {
          const mockMember = {
            id: Date.now().toString(),
            group_id: selectedGroup.id,
            user_id: memberForm.user_id,
            role: memberForm.role,
            joined_at: new Date().toISOString(),
            user: users.find(u => u.id === memberForm.user_id) || {
              id: memberForm.user_id,
              full_name: 'Unknown User',
              email: 'unknown@example.com',
              role: memberForm.role
            }
          }
          setGroupMembers(prev => [...prev, mockMember])
          toast.success(`User added to ${selectedGroup.name} successfully! (mock data)`)
          setShowAddMember(false)
          setMemberForm({ user_id: '', role: 'student' })
          return
        }
        throw error
      }

      toast.success(`User added to ${selectedGroup.name} successfully!`)
      setShowAddMember(false)
      setMemberForm({ user_id: '', role: 'student' })
      
      // Refresh the data
      loadGroups()
      loadUsers()
      loadGroupMembers(selectedGroup.id)
    } catch (error) {
      console.error('Error adding member:', error)
      toast.error('Failed to add member to group')
    }
  }

  const removeMemberFromGroup = async (memberId: string) => {
    try {
      const { error } = await supabase
        .from('group_members')
        .delete()
        .eq('id', memberId)

      if (error) {
        console.error('Error removing member:', error)
        // For development, remove from local state if database fails
        if (error.message.includes('relation "group_members" does not exist')) {
          setGroupMembers(prev => prev.filter(member => member.id !== memberId))
          toast.success('Member removed successfully (mock data)')
          if (selectedGroup) {
            loadGroupMembers(selectedGroup.id)
            loadGroups() // Refresh member count
          }
          return
        }
        throw error
      }

      toast.success('Member removed successfully')
      if (selectedGroup) {
        loadGroupMembers(selectedGroup.id)
        loadGroups() // Refresh member count
      }
    } catch (error) {
      console.error('Error removing member:', error)
      toast.error('Failed to remove member')
    }
  }

  const updateGroupStatus = async (groupId: string, status: 'active' | 'inactive' | 'completed') => {
    try {
      const { error } = await supabase
        .from('groups')
        .update({ status })
        .eq('id', groupId)

      if (error) {
        console.error('Error updating group status:', error)
        // For development, update local state if database fails
        if (error.message.includes('relation "groups" does not exist')) {
          setGroups(prev => prev.map(group => 
            group.id === groupId ? { ...group, status } : group
          ))
          toast.success('Group status updated (mock data)')
          return
        }
        throw error
      }

      toast.success('Group status updated')
      loadGroups()
    } catch (error) {
      console.error('Error updating group status:', error)
      toast.error('Failed to update group status')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'inactive':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'manager':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'client':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'student':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const isUserAssigned = (userId: string) => {
    return groupMembers.some(member => member.user_id === userId)
  }

  const getUserGroups = (userId: string) => {
    return groupMembers
      .filter(member => member.user_id === userId)
      .map(member => member.group?.name || 'Unknown Group')
      .join(', ')
  }

  // Show loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Manager Dashboard</h1>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm text-gray-600">Loading...</span>
          </div>
        </div>
        
        {/* Development override button */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 mb-2">
            <strong>Development Mode:</strong> If you're stuck loading, try this:
          </p>
          <Button 
            onClick={() => {
              localStorage.setItem('managerAccess', 'true')
              window.location.reload()
            }}
            className="bg-yellow-600 hover:bg-yellow-700"
          >
            Force Enable Quick Access
          </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // Show access denied if no access granted
  if (!accessGranted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-xl text-red-600">Access Denied</CardTitle>
            <CardDescription>
              You don't have permission to access the manager dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 mb-2">
                <strong>Development Mode:</strong> Enable quick access:
              </p>
              <Button 
                onClick={() => {
                  localStorage.setItem('managerAccess', 'true')
                  window.location.reload()
                }}
                className="w-full bg-yellow-600 hover:bg-yellow-700"
              >
                Enable Quick Access
              </Button>
            </div>
            
            <Button 
              onClick={() => router.push('/dashboard/client')}
              variant="outline"
              className="w-full"
            >
              Go to Client Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Check if user has manager access
  // if (!user || !hasManagerAccess(user)) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <div className="text-center max-w-md mx-auto p-8">
  //         <AlertTriangle className="mx-auto h-16 w-16 text-red-500 mb-4" />
  //         <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
  //         <p className="text-gray-600 mb-6">
  //           You don't have permission to access the manager dashboard. 
  //           Only authorized managers can view this page.
  //         </p>
  //         <Button onClick={() => router.push('/dashboard/client')} className="bg-teal-600 hover:bg-teal-700">
  //           Go to Client Dashboard
  //         </Button>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manager Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage groups and assign team members</p>
        </div>
        <Dialog open={showCreateGroup} onOpenChange={setShowCreateGroup}>
          <DialogTrigger asChild>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Plus className="mr-2 h-4 w-4" />
              Create Group
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Group</DialogTitle>
              <DialogDescription>
                Create a new group to organize your team members and projects.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Group Name</Label>
                <Input
                  id="name"
                  value={groupForm.name}
                  onChange={(e) => setGroupForm({ ...groupForm, name: e.target.value })}
                  placeholder="Enter group name"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={groupForm.description}
                  onChange={(e) => setGroupForm({ ...groupForm, description: e.target.value })}
                  placeholder="Enter group description"
                />
              </div>
              <div>
                <Label htmlFor="max_members">Maximum Members</Label>
                <Input
                  id="max_members"
                  type="number"
                  value={groupForm.max_members}
                  onChange={(e) => setGroupForm({ ...groupForm, max_members: parseInt(e.target.value) })}
                  min="1"
                  max="50"
                />
              </div>
              <Button onClick={createGroup} className="w-full bg-teal-600 hover:bg-teal-700">
                Create Group
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="groups" className="space-y-6">
        <TabsList>
          <TabsTrigger value="groups">Groups</TabsTrigger>
          <TabsTrigger value="users">All Users</TabsTrigger>
          <TabsTrigger value="members">Group Members</TabsTrigger>
        </TabsList>

        <TabsContent value="groups" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {groups.map((group) => (
              <Card key={group.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <CardDescription className="mt-2">{group.description}</CardDescription>
                    </div>
                    <Select
                      value={group.status}
                      onValueChange={(value: 'active' | 'inactive' | 'completed') => 
                        updateGroupStatus(group.id, value)
                      }
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {group.member_count} / {group.max_members} members
                      </span>
                    </div>
                    <Badge variant={group.status === 'active' ? 'default' : 'secondary'}>
                      {group.status}
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedGroup(group)
                        loadGroupMembers(group.id)
                      }}
                      className="flex-1"
                    >
                      <Users className="mr-2 h-4 w-4" />
                      View Members
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedGroup(group)
                        setShowAddMember(true)
                      }}
                      disabled={group.member_count >= group.max_members}
                    >
                      <UserPlus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">All Registered Users</h3>
            <Badge variant="outline">{users.length} total users</Badge>
          </div>
          <div className="grid gap-4">
            {users.map((user) => {
              const userGroups = groupMembers.filter(member => member.user_id === user.id)
              const isAssigned = userGroups.length > 0
              
              return (
                <Card key={user.id} className={`${isAssigned ? 'border-green-200 bg-green-50/50' : 'border-orange-200 bg-orange-50/50'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback className="bg-teal-100 text-teal-600 font-semibold">
                            {user.full_name?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.full_name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="capitalize">
                              {user.role}
                            </Badge>
                            {user.company && (
                              <Badge variant="secondary" className="text-xs">
                                {user.company}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-right">
                          {isAssigned ? (
                            <div>
                              <Badge variant="outline" className="bg-green-100 text-green-800 mb-1">
                                Assigned to {userGroups.length} group{userGroups.length > 1 ? 's' : ''}
                              </Badge>
                              <p className="text-xs text-gray-500">
                                {getUserGroups(user.id)}
                              </p>
                            </div>
                          ) : (
                            <Badge variant="outline" className="text-orange-600 border-orange-300">
                              Not Assigned
                            </Badge>
                          )}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setMemberForm({ user_id: user.id, role: user.role as 'client' | 'student' })
                            setShowAddMember(true)
                          }}
                        >
                          <UserPlus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="members" className="space-y-4">
          {selectedGroup ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">
                  Members of {selectedGroup.name}
                </h3>
                <Dialog open={showAddMember} onOpenChange={setShowAddMember}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add Member
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Member to {selectedGroup.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="user">Select User</Label>
                        <Select
                          value={memberForm.user_id}
                          onValueChange={(value) => setMemberForm({ ...memberForm, user_id: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a user" />
                          </SelectTrigger>
                          <SelectContent>
                            {users
                              .filter(user => !groupMembers.some(member => member.user_id === user.id))
                              .map((user) => (
                                <SelectItem key={user.id} value={user.id}>
                                  {user.full_name} ({user.email}) - {user.role}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="role">Role in Group</Label>
                        <Select
                          value={memberForm.role}
                          onValueChange={(value: 'client' | 'student') => 
                            setMemberForm({ ...memberForm, role: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="student">Student</SelectItem>
                            <SelectItem value="client">Client</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={addMemberToGroup} className="w-full bg-teal-600 hover:bg-teal-700">
                        Add Member
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="grid gap-4">
                {groupMembers.map((member) => (
                  <Card key={member.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src="/placeholder-user.jpg" />
                            <AvatarFallback>
                              {member.user.full_name?.charAt(0) || 'U'}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.user.full_name}</p>
                            <p className="text-sm text-gray-600">{member.user.email}</p>
                            <Badge variant="outline" className="mt-1">
                              {member.role}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">
                            Joined {new Date(member.joined_at).toLocaleDateString()}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeMemberFromGroup(member.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No group selected</h3>
              <p className="mt-1 text-sm text-gray-500">
                Select a group from the Groups tab to view its members.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
