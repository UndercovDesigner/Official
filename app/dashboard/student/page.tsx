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
import { Calendar, MessageSquare, Upload, CheckCircle, Circle, Clock, Play, Pause, Plus, ArrowRight, User, FileUp, ListChecks, RadioTower, Users, Building, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
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
  client: {
    full_name: string
    company: string
  }
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
}

export default function StudentDashboardPage() {
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
      // Load user's groups
      const { data: groupMembers, error: groupError } = await supabase
        .from('group_members')
        .select(`
          group:groups(*)
        `)
        .eq('user_id', user?.id)

      if (groupError) throw groupError

      const groups: Group[] = []
      if (groupMembers) {
        for (const member of groupMembers) {
          if (member.group && typeof member.group === 'object') {
            groups.push(member.group as Group)
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
      toast.error('Failed to load your data')
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

      // Load projects for this group
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select(`
          *,
          client:profiles(full_name, company)
        `)
        .eq('group_id', groupId)
        .order('created_at', { ascending: false })

      if (projectsError) throw projectsError
      setProjects(projectsData || [])

      // Load tasks assigned to this user in this group
      const { data: tasksData, error: tasksError } = await supabase
        .from('tasks')
        .select('*')
        .eq('group_id', groupId)
        .eq('assigned_to', user?.id)
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
          <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Waiting for Team Assignment</h2>
          <p className="text-gray-600 mb-4">
            You haven't been assigned to any teams yet. The manager will add you to a group soon.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-sm text-blue-800">
              <strong>What happens next?</strong><br />
              • You'll be notified when added to a team<br />
              • You'll get access to your project dashboard<br />
              • You can start working on assigned tasks
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
  const userTasks = tasks.filter(task => task.assigned_to === user?.id)
  const completedTasks = userTasks.filter(task => task.status === 'completed')
  const inProgressTasks = userTasks.filter(task => task.status === 'in_progress')
  const pendingTasks = userTasks.filter(task => task.status === 'pending')
  const progressPercentage = userTasks.length > 0 ? (completedTasks.length / userTasks.length) * 100 : 0

  return (
    <div className="space-y-6">
      {/* Group Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
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
          {/* Project Header */}
          {currentProject && (
            <div className="rounded-xl bg-green-600 text-white p-6 shadow-lg relative overflow-hidden">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">{currentProject.title}</h1>
                  <p className="text-sm text-green-200 mt-1">
                    {currentProject.client?.company || 'Client'} - Due {new Date(currentProject.due_date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-green-200 mt-1">{selectedGroup.name}</p>
                </div>
                <div className="text-left md:text-right flex-shrink-0">
                  <p className="text-4xl font-bold">${currentProject.budget}</p>
                  <p className="text-xs text-green-200">Project Budget</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <p className="text-sm font-medium">Your Progress</p>
                <Progress value={progressPercentage} className="w-full h-2 bg-green-500/50 [&>*]:bg-white" />
                <Badge className="bg-white/20 text-white font-semibold">
                  {progressPercentage >= 80 ? 'On Track' : progressPercentage >= 50 ? 'In Progress' : 'Getting Started'}
                </Badge>
                <p className="text-sm font-bold flex-shrink-0">{Math.round(progressPercentage)}%</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="w-full bg-teal-600 text-white hover:bg-teal-700 font-semibold py-6 flex-1">
              <Upload className="mr-2 h-4 w-4" /> Upload Progress
            </Button>
            <Button variant="outline" className="w-full bg-white hover:bg-slate-50 font-semibold py-6 flex-1">
              <Clock className="mr-2 h-4 w-4" /> Log Time
            </Button>
            <Button variant="outline" className="w-full bg-white hover:bg-slate-50 font-semibold py-6 flex-1">
              <Calendar className="mr-2 h-4 w-4" /> Schedule Meeting
            </Button>
            <Button variant="outline" className="w-full bg-white hover:bg-slate-50 font-semibold py-6 flex-1">
              <MessageSquare className="mr-2 h-4 w-4" /> Team Chat
            </Button>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              {/* Your Tasks */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Tasks</CardTitle>
                  <CardDescription>Student in {selectedGroup.name}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {userTasks.length === 0 ? (
                    <div className="text-center py-8">
                      <ListChecks className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-gray-600">No tasks assigned yet.</p>
                    </div>
                  ) : (
                    userTasks.map((task) => (
                      <div key={task.id} className={`flex items-center gap-4 p-4 rounded-lg ${
                        task.status === 'completed' ? 'bg-green-50/80' :
                        task.status === 'in_progress' ? 'border-2 border-blue-500 bg-blue-50/50' :
                        'bg-slate-100/80'
                      }`}>
                        {task.status === 'completed' ? (
                          <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                        ) : task.status === 'in_progress' ? (
                          <RadioTower className="h-6 w-6 text-blue-600 flex-shrink-0 animate-pulse" />
                        ) : (
                          <Circle className="h-6 w-6 text-slate-400 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-800">{task.title}</h3>
                          <p className="text-sm text-slate-500">
                            {task.status === 'completed' ? 'Completed' : 
                             task.status === 'in_progress' ? 'In Progress' : 'Pending'} • 
                            Due {new Date(task.due_date).toLocaleDateString()}
                          </p>
                          {task.status === 'in_progress' && (
                            <Progress value={75} className="h-1.5 mt-2 bg-blue-100 [&>*]:bg-blue-600" />
                          )}
                        </div>
                        <Badge className={`${
                          task.status === 'completed' ? 'bg-white text-green-700 border border-green-200' :
                          task.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {task.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>

              {/* Time Tracking */}
              <Card>
                <CardHeader>
                  <CardTitle>Time Tracking</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg bg-slate-100/80 text-center">
                    <p className="text-sm text-slate-500">Currently Working</p>
                    <p className="font-semibold text-slate-800 mb-2">
                      {inProgressTasks[0]?.title || 'No active task'}
                    </p>
                    <p className="text-4xl font-bold text-slate-800 tracking-tighter">0:00:00</p>
                    <p className="text-xs text-slate-500 uppercase font-semibold">Today</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-slate-100/80 text-center">
                      <p className="text-2xl font-bold">
                        {userTasks.reduce((total, task) => total + (task.actual_hours || 0), 0)}h
                      </p>
                      <p className="text-sm text-slate-500">Total Logged</p>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-100/80 text-center">
                      <p className="text-2xl font-bold">
                        {userTasks.reduce((total, task) => total + (task.estimated_hours || 0), 0)}h
                      </p>
                      <p className="text-sm text-slate-500">Estimated</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="grid grid-cols-2 gap-4 border-t pt-4">
                  <Button className="w-full bg-teal-600 text-white hover:bg-teal-700">
                    <Pause className="mr-2 h-4 w-4" /> Pause Timer
                  </Button>
                  <Button variant="outline" className="w-full bg-white">
                    <Clock className="mr-2 h-4 w-4" /> Log Manual Time
                  </Button>
                </CardFooter>
              </Card>

              {/* Submit Progress Update */}
              <Card>
                <CardHeader>
                  <CardTitle>Submit Progress Update</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed bg-slate-50 p-8 text-center">
                    <FileUp className="h-12 w-12 text-slate-400 mb-4" />
                    <p className="font-semibold mb-2">Upload screenshots, files, or progress demos</p>
                    <Button variant="outline" className="bg-white">Choose Files</Button>
                  </div>
                  <div>
                    <label htmlFor="progress-description" className="text-sm font-medium text-slate-700">
                      Progress Description
                    </label>
                    <Textarea 
                      id="progress-description" 
                      placeholder="Describe what you've completed and any challenges you're facing..." 
                      className="mt-2" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="progress-percentage" className="text-sm font-medium text-slate-700">
                      Project Completion Percentage
                    </label>
                    <div className="flex items-center gap-4">
                      <Slider defaultValue={[progressPercentage]} max={100} step={1} className="w-full" />
                      <span className="font-bold text-lg">{Math.round(progressPercentage)}%</span>
                    </div>
                    <p className="text-xs text-slate-500">
                      This will update the client's project progress view.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button className="w-full bg-teal-600 text-white hover:bg-teal-700">
                    Submit Progress Update
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="lg:col-span-1 space-y-6">
              {/* Your Team */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Team</CardTitle>
                  <CardDescription>{selectedGroup.name}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {groupMembers.map((member) => (
                    <div key={member.id} className="flex items-center gap-4 p-3 rounded-lg bg-slate-50">
                      <Avatar className="h-10 w-10 relative">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback className="bg-teal-100 text-teal-600 font-semibold">
                          {member.user.full_name?.charAt(0) || 'U'}
                        </AvatarFallback>
                        <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />
                      </Avatar>
                      <div>
                        <p className="font-semibold">
                          {member.user.full_name}
                          {member.user_id === user?.id && ' (You)'}
                        </p>
                        <p className="text-sm text-slate-500 capitalize">{member.role}</p>
                        {member.user.company && (
                          <p className="text-xs text-slate-400">{member.user.company}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Group Info */}
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
                    <span className="text-sm text-slate-500">Members</span>
                    <span className="font-semibold">{groupMembers.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">Projects</span>
                    <span className="font-semibold">{projects.length}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  )
} 