"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Code,
  Megaphone,
  Calculator,
  Headphones,
  GraduationCap,
  Star,
  ArrowRight,
  ExternalLink,
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Eye,
  Heart,
  MessageCircle,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import Footer from "@/components/footer"

interface Project {
  id: string
  title: string
  description: string
  category: string
  division: string
  image: string
  client: string
  duration: string
  teamSize: number
  price: string
  results: string[]
  testimonial?: {
    text: string
    author: string
    role: string
  }
  tags: string[]
  status: "completed" | "in-progress"
}

const projects: Project[] = [
  {
    id: "1",
    title: "Modern E-commerce Website",
    description: "Complete online store with payment integration and inventory management",
    category: "web-development",
    division: "LaunchTech",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop&crop=center",
    client: "Bella's Boutique",
    duration: "3 weeks",
    teamSize: 3,
    price: "$2,400",
    results: ["40% increase in online sales", "Reduced cart abandonment by 25%", "Mobile conversion rate improved by 35%"],
    testimonial: {
      text: "The LaunchTech team delivered exactly what we needed. Our online sales have skyrocketed!",
      author: "Sarah Johnson",
      role: "Owner, Bella's Boutique"
    },
    tags: ["React", "Stripe", "Responsive Design"],
    status: "completed"
  },
  {
    id: "2",
    title: "Social Media Campaign",
    description: "Comprehensive social media strategy and content creation",
    category: "marketing",
    division: "BrightMarketing",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=500&fit=crop&crop=center",
    client: "Green Earth Cafe",
    duration: "2 months",
    teamSize: 2,
    price: "$1,800",
    results: ["300% increase in Instagram followers", "50% boost in foot traffic", "Generated 200+ new customers"],
    testimonial: {
      text: "Our cafe is now the talk of the town! The marketing team's creativity is unmatched.",
      author: "Mike Chen",
      role: "Manager, Green Earth Cafe"
    },
    tags: ["Instagram", "Content Creation", "Local SEO"],
    status: "completed"
  },
  {
    id: "3",
    title: "QuickBooks Setup & Training",
    description: "Complete accounting system setup with staff training",
    category: "bookkeeping",
    division: "FreshBooks",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop&crop=center",
    client: "TechStart Consulting",
    duration: "1 week",
    teamSize: 1,
    price: "$900",
    results: ["Automated invoice processing", "Reduced accounting time by 60%", "Improved financial reporting"],
    tags: ["QuickBooks", "Automation", "Training"],
    status: "completed"
  },
  {
    id: "4",
    title: "CRM Implementation",
    description: "Salesforce setup and data migration for growing agency",
    category: "admin",
    division: "ClearDesk",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop&crop=center",
    client: "Creative Solutions Agency",
    duration: "2 weeks",
    teamSize: 2,
    price: "$1,500",
    results: ["Streamlined lead management", "Improved customer retention by 30%", "Reduced admin workload by 40%"],
    tags: ["Salesforce", "Data Migration", "Process Optimization"],
    status: "completed"
  },
  {
    id: "5",
    title: "Math Tutoring Program",
    description: "Customized learning plans for high school students",
    category: "tutoring",
    division: "NextTutors",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=500&fit=crop&crop=center",
    client: "Riverside High School",
    duration: "Ongoing",
    teamSize: 4,
    price: "$2,000/month",
    results: ["85% of students improved grades", "100% parent satisfaction", "Increased test scores by 25%"],
    testimonial: {
      text: "The NextTutors team has transformed our students' confidence in math. Highly recommended!",
      author: "Dr. Emily Rodriguez",
      role: "Principal, Riverside High"
    },
    tags: ["Mathematics", "Personalized Learning", "Test Prep"],
    status: "completed"
  },
  {
    id: "6",
    title: "Restaurant Website Redesign",
    description: "Modern, mobile-first website with online ordering",
    category: "web-development",
    division: "LaunchTech",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=500&fit=crop&crop=center",
    client: "Pizza Palace",
    duration: "2 weeks",
    teamSize: 2,
    price: "$1,200",
    results: ["Online orders increased by 150%", "Mobile traffic up 80%", "Customer satisfaction improved"],
    tags: ["Next.js", "Mobile-First", "Online Ordering"],
    status: "completed"
  }
]

const categories = [
  { id: "all", label: "All Projects", icon: Eye },
  { id: "web-development", label: "Web Development", icon: Code },
  { id: "marketing", label: "Marketing", icon: Megaphone },
  { id: "bookkeeping", label: "Bookkeeping", icon: Calculator },
  { id: "admin", label: "Administration", icon: Headphones },
  { id: "tutoring", label: "Tutoring", icon: GraduationCap },
]

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === activeCategory)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-teal-50 to-blue-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900">
              Our Work Showcase
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Discover how our university student teams have helped businesses grow through 
              innovative solutions across web development, marketing, bookkeeping, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          {/* Filter Tabs */}
          <div className="flex justify-center mb-12">
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full max-w-4xl">
              <TabsList className="grid w-full grid-cols-6 h-auto bg-slate-100 p-1">
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{category.label}</span>
                    </TabsTrigger>
                  )
                })}
              </TabsList>
            </Tabs>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="group hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 bg-gradient-to-br from-white to-slate-50 overflow-hidden">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={400}
                      height={250}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4">
                      <Badge className={`${project.status === "completed" ? "bg-green-500 text-white" : "bg-yellow-500 text-white"} shadow-lg`}>
                        {project.status === "completed" ? "✓ Completed" : "⏳ In Progress"}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <p className="text-sm font-semibold text-slate-800">This is how your project will look!</p>
                        <p className="text-xs text-slate-600 mt-1">Professional showcase with results & testimonials</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2 text-slate-900 group-hover:text-teal-700 transition-colors">{project.title}</CardTitle>
                        <CardDescription className="text-sm mb-3 text-slate-600 leading-relaxed">{project.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-slate-600 bg-slate-100 rounded-lg px-3 py-2">
                      <span className="font-semibold text-slate-800">{project.client}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-teal-600 font-medium">{project.division}</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6 pt-0 space-y-5">
                  {/* Project Stats */}
                  <div className="grid grid-cols-3 gap-4 text-sm bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 text-slate-700">
                        <Calendar className="h-4 w-4 text-teal-600" />
                        <span className="font-medium">{project.duration}</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 text-slate-700">
                        <Users className="h-4 w-4 text-teal-600" />
                        <span className="font-medium">{project.teamSize} students</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 text-slate-700">
                        <DollarSign className="h-4 w-4 text-teal-600" />
                        <span className="font-medium">{project.price}</span>
                      </div>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-900 flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-teal-600" />
                      <span>Key Results</span>
                    </h4>
                    <ul className="space-y-2">
                      {project.results.slice(0, 2).map((result, index) => (
                        <li key={index} className="text-sm text-slate-700 flex items-start space-x-3 bg-white rounded-lg p-3 border border-slate-200">
                          <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="leading-relaxed">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} className="bg-teal-100 text-teal-800 hover:bg-teal-200 text-xs font-medium">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Testimonial */}
                  {project.testimonial && (
                    <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-4 border-l-4 border-teal-500">
                      <p className="text-sm text-slate-700 italic mb-3 leading-relaxed">"{project.testimonial.text}"</p>
                      <div className="text-xs text-slate-600">
                        <span className="font-semibold text-slate-800">{project.testimonial.author}</span>
                        <span className="ml-2 text-slate-500">• {project.testimonial.role}</span>
                      </div>
                    </div>
                  )}

                  {/* View Details Button */}
                  <Button className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0">
                    <span>View Project Details</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Demo Explanation */}
          <div className="mt-16 text-center bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-8 border border-teal-200">
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                  <Eye className="h-4 w-4 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">This is a Preview of Your Future Projects</h3>
              </div>
              <p className="text-slate-600 text-lg leading-relaxed">
                These are example project showcases demonstrating how your completed work will be presented. 
                Each project includes detailed results, testimonials, and metrics that showcase the value 
                our student teams deliver to businesses like yours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span>Real project examples</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span>Detailed results & metrics</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span>Client testimonials</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="container mx-auto px-4 lg:px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-6 scroll-animate">
            {/* Main Heading with Animation */}
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-4">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white/90 text-sm font-medium">Professional services at student prices</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                Ready to 
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent"> Transform</span> 
                Your Business?
              </h2>
              
              <p className="text-xl text-teal-100 max-w-3xl mx-auto leading-relaxed">
                Join the growing list of satisfied clients who've transformed their businesses with our student teams.
                <span className="font-semibold text-white"> Free consultation</span> with no strings attached.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-white to-slate-100 text-teal-600 hover:from-slate-100 hover:to-white transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl font-bold text-lg px-8 py-6">
                  <Link href="/#contact" className="text-teal-600 flex items-center">
                    <Calendar className="mr-3 h-5 w-5" />
                    Get Free Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white/20 transform hover:scale-105 transition-all duration-300 font-bold text-lg px-8 py-6"
                >
                  <Link href="/about" className="text-white flex items-center">
                    <ExternalLink className="mr-3 h-5 w-5" />
                    Learn More About Us
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              
              {/* Urgency Banner */}
              <div className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm border border-yellow-300/30 rounded-xl p-4 max-w-md mx-auto">
                <div className="flex items-center justify-center space-x-2 text-white">
                  <Calendar className="h-4 w-4 text-yellow-300" />
                  <span className="text-sm font-medium">Limited spots available this month</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 