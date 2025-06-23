"use client"

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { supabase } from '@/lib/supabase'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Calendar, MessageSquare, Upload, Star, CheckCircle, Circle, Info, FileText, PenSquare, Eye, Download, AlertTriangle, ArrowRight, ListChecks } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from 'sonner'
import { NotificationBanner } from '@/components/ui/notification-banner'

interface Group {
  id: string
  name: string
  description: string
  status: 'active' | 'inactive' | 'completed'
  created_at: string
}

interface GroupMember {
  id: string
  user_id: string
  role: 'client' | 'student' | 'admin' | 'manager'
  joined_at: string
  user: {
    id: string
    full_name: string
    email: string
    role: string
    company?: string
  }
}

interface Project {
  id: string
  title: string
  description: string
  status: 'draft' | 'active' | 'completed' | 'cancelled'
  budget: number
  start_date: string
  due_date: string
  progress_percentage?: number
}

interface Task {
  id: string
  title: string
  description: string
  status: 'pending' | 'in_progress' | 'completed' | 'blocked'
  priority: number
  estimated_hours: number
  actual_hours: number
  due_date: string
  assigned_to: string
  assigned_user?: {
    full_name: string
  }
}

export default function ClientDashboardPage() {
  const { user } = useAuth()
  const [userGroups, setUserGroups] = useState<Group[]>([])
  const [groupMembers, setGroupMembers] = useState<GroupMember[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [loading, setLoading] = useState(true)
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')

  useEffect(() => {
    if (user) {
      loadUserData()
    }
  }, [user])

  const loadUserData = async () => {
    try {
      // Get groups where user is a member
      const { data: groupMemberships, error: membershipError } = await supabase
        .from('group_members')
        .select(`
          group:groups(*)
        `)
        .eq('user_id', user?.id)
        .eq('role', 'client')

      if (membershipError) throw membershipError

      // Extract groups from the nested structure
      const groups: Group[] = []
      if (groupMemberships) {
        for (const membership of groupMemberships) {
          if (membership.group && typeof membership.group === 'object') {
            groups.push(membership.group as Group)
          }
        }
      }
      
      setUserGroups(groups)

      if (groups.length > 0) {
        setSelectedGroup(groups[0])
        await loadGroupData(groups[0].id)
      }

      // Show notification if user was just added to a group
      if (groups.length > 0 && !localStorage.getItem('groupNotificationShown')) {
        setNotificationMessage(`Welcome! You've been added to ${groups[0].name}. You now have access to your project dashboard.`)
        setShowNotification(true)
        localStorage.setItem('groupNotificationShown', 'true')
      }
    } catch (error) {
      console.error('Error loading user data:', error)
      toast.error('Failed to load user data')
    } finally {
      setLoading(false)
    }
  }

  const loadGroupData = async (groupId: string) => {
    try {
      // Load group members
      const { data: members, error: membersError } = await supabase
        .from('group_members')
        .select(`
          *,
          user:profiles(*)
        `)
        .eq('group_id', groupId)

      if (membersError) throw membersError
      setGroupMembers(members || [])

      // Load projects for this group where user is the client
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .eq('group_id', groupId)
        .eq('client_id', user?.id)
        .order('created_at', { ascending: false })

      if (projectsError) throw projectsError
      setProjects(projectsData || [])

      // Load all tasks for this group
      const { data: tasksData, error: tasksError } = await supabase
        .from('tasks')
        .select(`
          *,
          assigned_user:profiles(full_name)
        `)
        .eq('group_id', groupId)
        .order('due_date', { ascending: true })

      if (tasksError) throw tasksError
      setTasks(tasksData || [])
    } catch (error) {
      console.error('Error loading group data:', error)
      toast.error('Failed to load group data')
    }
  }

  const handleGroupChange = async (group: Group) => {
    setSelectedGroup(group)
    await loadGroupData(group.id)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading your dashboard...</div>
      </div>
    )
  }

  if (userGroups.length === 0) {
    return (
      <div className="space-y-6">
        {showNotification && (
          <NotificationBanner
            message={notificationMessage}
            type="success"
            onDismiss={() => setShowNotification(false)}
            autoHide={false}
          />
        )}
        <div className="text-center py-12">
          <ListChecks className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Waiting for Team Assignment</h2>
          <p className="text-gray-600 mb-4">
            You haven't been assigned to any teams yet. The manager will add you to a group soon.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-sm text-blue-800">
              <strong>What happens next?</strong><br />
              • You'll be notified when added to a team<br />
              • You'll get access to your project dashboard<br />
              • You can monitor project progress and deliverables
            </p>
          </div>
          <Button onClick={() => window.location.href = '/'} className="mt-6 bg-teal-600 hover:bg-teal-700">
            Return to Homepage
          </Button>
        </div>
      </div>
    )
  }

  const currentProject = projects[0] // Show the most recent project
  const completedTasks = tasks.filter(task => task.status === 'completed')
  const inProgressTasks = tasks.filter(task => task.status === 'in_progress')
  const pendingTasks = tasks.filter(task => task.status === 'pending')
  const totalProgress = tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0

  return (
    <div className="space-y-6">
      {/* Group Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ListChecks className="h-5 w-5" />
            Your Groups
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {userGroups.map((group) => (
              <Button
                key={group.id}
                variant={selectedGroup?.id === group.id ? "default" : "outline"}
                onClick={() => handleGroupChange(group)}
                className={selectedGroup?.id === group.id ? "bg-teal-600 hover:bg-teal-700" : ""}
              >
                {group.name}
                <Badge variant="secondary" className="ml-2">
                  {group.status}
                </Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedGroup && (
        <>
          {/* Project Overview */}
          {currentProject && (
            <div className="rounded-xl bg-blue-600 text-white p-6 shadow-lg relative overflow-hidden">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">{currentProject.title}</h1>
                  <p className="text-sm text-blue-200 mt-1">
                    {selectedGroup.name} - Due {new Date(currentProject.due_date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-blue-200 mt-1">{currentProject.description}</p>
                </div>
                <div className="text-left md:text-right flex-shrink-0">
                  <p className="text-4xl font-bold">${currentProject.budget}</p>
                  <p className="text-xs text-blue-200">Project Budget</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <p className="text-sm font-medium">Overall Progress</p>
                <Progress value={totalProgress} className="w-full h-2 bg-blue-500/50 [&>*]:bg-white" />
                <Badge className="bg-white/20 text-white font-semibold">
                  {totalProgress >= 80 ? 'Nearly Complete' : totalProgress >= 50 ? 'In Progress' : 'Getting Started'}
                </Badge>
                <p className="text-sm font-bold flex-shrink-0">{Math.round(totalProgress)}%</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="w-full bg-teal-600 text-white hover:bg-teal-700 font-semibold py-6 flex-1">
              <Calendar className="mr-2 h-4 w-4" /> Schedule Meeting
            </Button>
            <Button variant="outline" className="w-full bg-white hover:bg-slate-50 font-semibold py-6 flex-1">
              <MessageSquare className="mr-2 h-4 w-4" /> Team Chat
            </Button>
            <Button variant="outline" className="w-full bg-white hover:bg-slate-50 font-semibold py-6 flex-1">
              <FileText className="mr-2 h-4 w-4" /> View Reports
            </Button>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                  {/* Project Progress */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Project Progress</CardTitle>
                      <CardDescription>Overall project status and milestones</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 rounded-lg bg-green-50">
                          <p className="text-2xl font-bold text-green-600">{completedTasks.length}</p>
                          <p className="text-sm text-green-700">Completed</p>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-blue-50">
                          <p className="text-2xl font-bold text-blue-600">{inProgressTasks.length}</p>
                          <p className="text-sm text-blue-700">In Progress</p>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-slate-50">
                          <p className="text-2xl font-bold text-slate-600">{pendingTasks.length}</p>
                          <p className="text-sm text-slate-700">Pending</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Overall Progress</span>
                          <span>{Math.round(totalProgress)}%</span>
                        </div>
                        <Progress value={totalProgress} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Activity */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {tasks.length === 0 ? (
                        <div className="text-center py-8">
                          <ListChecks className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                          <p className="text-gray-600">No recent activity.</p>
                        </div>
                      ) : (
                        tasks.slice(0, 5).map((task) => (
                          <div key={task.id} className="flex items-center gap-4 p-3 rounded-lg bg-slate-50">
                            <div className={`w-2 h-2 rounded-full ${
                              task.status === 'completed' ? 'bg-green-500' :
                              task.status === 'in_progress' ? 'bg-blue-500' :
                              'bg-slate-400'
                            }`} />
                            <div className="flex-1">
                              <p className="font-medium">{task.title}</p>
                              <p className="text-sm text-slate-600">
                                {task.assigned_user?.full_name || 'Unassigned'} • 
                                {task.status === 'completed' ? ' Completed' : 
                                 task.status === 'in_progress' ? ' In Progress' : ' Pending'}
                              </p>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {new Date(task.due_date).toLocaleDateString()}
                            </Badge>
                          </div>
                        ))
                      )}
                    </CardContent>
                  </Card>
                </div>

                <div className="lg:col-span-1 space-y-6">
                  {/* Project Stats */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Project Statistics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-500">Total Tasks</span>
                        <span className="font-semibold">{tasks.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-500">Team Members</span>
                        <span className="font-semibold">{groupMembers.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-500">Days Remaining</span>
                        <span className="font-semibold">
                          {currentProject ? Math.ceil((new Date(currentProject.due_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-500">Budget Used</span>
                        <span className="font-semibold">$0</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Send Message
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Calendar className="mr-2 h-4 w-4" />
                        Schedule Review
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="mr-2 h-4 w-4" />
                        Download Files
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <ListChecks className="mr-2 h-4 w-4" />
                        View Reports
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tasks" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>All Tasks</CardTitle>
                  <CardDescription>Track progress of all project tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {tasks.length === 0 ? (
                    <div className="text-center py-8">
                      <ListChecks className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-gray-600">No tasks created yet.</p>
                    </div>
                  ) : (
                    tasks.map((task) => (
                      <div key={task.id} className={`flex items-center gap-4 p-4 rounded-lg border ${
                        task.status === 'completed' ? 'bg-green-50 border-green-200' :
                        task.status === 'in_progress' ? 'bg-blue-50 border-blue-200' :
                        'bg-slate-50 border-slate-200'
                      }`}>
                        {task.status === 'completed' ? (
                          <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                        ) : task.status === 'in_progress' ? (
                          <div className="h-6 w-6 rounded-full border-2 border-blue-600 border-t-transparent animate-spin flex-shrink-0" />
                        ) : (
                          <Circle className="h-6 w-6 text-slate-400 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-800">{task.title}</h3>
                          <p className="text-sm text-slate-600 mb-1">{task.description}</p>
                          <div className="flex items-center gap-4 text-xs text-slate-500">
                            <span>Assigned to: {task.assigned_user?.full_name || 'Unassigned'}</span>
                            <span>Due: {new Date(task.due_date).toLocaleDateString()}</span>
                            <span>Est: {task.estimated_hours}h</span>
                          </div>
                        </div>
                        <Badge className={`${
                          task.status === 'completed' ? 'bg-green-100 text-green-800' :
                          task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-slate-100 text-slate-800'
                        }`}>
                          {task.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="team" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Team</CardTitle>
                  <CardDescription>{selectedGroup.name}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {groupMembers.map((member) => (
                    <div key={member.id} className="flex items-center gap-4 p-4 rounded-lg bg-slate-50">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback className="bg-teal-100 text-teal-600 font-semibold">
                          {member.user.full_name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold">
                          {member.user.full_name}
                          {member.user_id === user?.id && ' (You)'}
                        </p>
                        <p className="text-sm text-slate-600 capitalize">{member.role}</p>
                        {member.user.company && (
                          <p className="text-xs text-slate-400">{member.user.company}</p>
                        )}
                        <p className="text-xs text-slate-500">
                          Joined {new Date(member.joined_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="capitalize">
                          {member.role}
                        </Badge>
                        <div className="mt-2">
                          <span className="text-xs text-slate-500">Tasks</span>
                          <p className="font-semibold">
                            {tasks.filter(task => task.assigned_to === member.user_id).length}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Group Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Group Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-800">{selectedGroup.name}</h4>
                    <p className="text-sm text-slate-600 mt-1">{selectedGroup.description}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">Status</span>
                    <Badge variant={selectedGroup.status === 'active' ? 'default' : 'secondary'}>
                      {selectedGroup.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">Created</span>
                    <span className="font-semibold">
                      {new Date(selectedGroup.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">Projects</span>
                    <span className="font-semibold">{projects.length}</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
} 