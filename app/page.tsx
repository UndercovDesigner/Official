"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Rocket,
  Users,
  DollarSign,
  Shield,
  Code,
  Megaphone,
  Calculator,
  Headphones,
  GraduationCap,
  CheckCircle,
  Star,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Eye,
  Clock,
  MessageCircle,
  AlertTriangle,
  User,
  Building,
  FileText,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import Footer from "@/components/footer"

export default function LaunchPathWebsite() {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [currentYear, setCurrentYear] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    service: "",
    projectDetails: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage("")

    try {
      // Here you would typically send to your backend/email service
      // For now, we'll simulate the submission
      const emailBody = `
New Consultation Request

Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Company: ${formData.company}
Service Needed: ${formData.service}
Project Details: ${formData.projectDetails}

This is a test submission. In production, you would integrate with an email service like SendGrid, Mailgun, or a form service like Formspree.
      `

      console.log("Form submitted:", emailBody)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSubmitMessage("Thank you! We'll get back to you within 24 hours.")
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        service: "",
        projectDetails: ""
      })
    } catch (error) {
      setSubmitMessage("There was an error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    // Create intersection observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    // Observe all elements with scroll-animate class
    const elements = document.querySelectorAll(".scroll-animate")
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => {
      observerRef.current?.disconnect()
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        
        .scroll-animate {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .scroll-animate.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .scroll-animate-left {
          opacity: 0;
          transform: translateX(-50px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .scroll-animate-left.animate-in {
          opacity: 1;
          transform: translateX(0);
        }
        
        .scroll-animate-right {
          opacity: 0;
          transform: translateX(50px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .scroll-animate-right.animate-in {
          opacity: 1;
          transform: translateX(0);
        }
        
        .scroll-animate-scale {
          opacity: 0;
          transform: scale(0.9);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .scroll-animate-scale.animate-in {
          opacity: 1;
          transform: scale(1);
        }
        
        .stagger-1 { transition-delay: 0.1s; }
        .stagger-2 { transition-delay: 0.2s; }
        .stagger-3 { transition-delay: 0.3s; }
        .stagger-4 { transition-delay: 0.4s; }
        .stagger-5 { transition-delay: 0.5s; }
        .stagger-6 { transition-delay: 0.6s; }
        
        .hero-animate {
          animation: heroFadeIn 1.2s ease-out forwards;
        }
        
        @keyframes heroFadeIn {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .float-animation {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-teal-50 to-blue-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2306b6d4' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-teal-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-200 rounded-full opacity-15 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-purple-200 rounded-full opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-60 left-1/3 w-14 h-14 bg-teal-300 rounded-full opacity-15 animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-40 right-1/3 w-18 h-18 bg-blue-300 rounded-full opacity-10 animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-80 right-1/4 w-10 h-10 bg-purple-300 rounded-full opacity-20 animate-pulse" style={{animationDelay: '0.8s'}}></div>
        <div className="absolute bottom-60 left-1/5 w-16 h-16 bg-teal-400 rounded-full opacity-10 animate-pulse" style={{animationDelay: '2.5s'}}></div>
        <div className="absolute top-40 left-2/3 w-12 h-12 bg-blue-400 rounded-full opacity-15 animate-pulse" style={{animationDelay: '1.2s'}}></div>
        
        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 hero-animate">
              <div className="space-y-6">
                <Badge className="bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700 px-4 py-2 text-sm font-semibold shadow-lg">
                  Professional • Affordable • Guaranteed
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
                  Professional Services at <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">Student-Friendly</span> Prices
                </h1>
                <div className="max-w-2xl">
                  <p className="text-xl lg:text-2xl text-slate-600 leading-relaxed font-medium">
                    Connect with highly educated university student & graduate teams who bring deep knowledge in
                    their fields of study.
                  </p>
                  <p className="text-lg text-slate-500 leading-relaxed mt-3">
                    Get professional web development, marketing, bookkeeping, and administrative
                    services—all fully managed and guaranteed.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-gradient-to-r from-teal-600 via-teal-700 to-teal-800 hover:from-teal-700 hover:via-teal-800 hover:to-teal-900 text-white font-semibold text-lg px-8 py-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0">
                  <a href="#contact" className="text-white flex items-center">
                    Get Free Consultation
                    <ArrowRight className="ml-3 h-5 w-5 animate-pulse" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-teal-400 hover:text-teal-700 font-semibold text-lg px-8 py-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <Link href="/portfolio" className="w-full h-full flex items-center justify-center">
                    <div className="flex items-center">
                      <Eye className="mr-3 h-5 w-5" />
                      View Our Work
                    </div>
                  </Link>
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 pt-4">
                <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-slate-200">
                  <CheckCircle className="h-4 w-4 text-teal-600" />
                  <span className="font-medium">Fixed-fee pricing</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-slate-200">
                  <CheckCircle className="h-4 w-4 text-teal-600" />
                  <span className="font-medium">Quality guaranteed</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-slate-200">
                  <CheckCircle className="h-4 w-4 text-teal-600" />
                  <span className="font-medium">No HR headaches</span>
                </div>
              </div>
            </div>
            <div className="relative hero-animate float-animation">
              <div className="bg-white rounded-2xl shadow-2xl p-7 border">
                <h3 className="font-semibold text-slate-900 mb-5 text-center">🚀 Your Path to Success Starts Here</h3>
                <div className="space-y-5">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-bold text-sm">1</div>
                    <div>
                      <div className="font-medium text-sm text-slate-900">Apply & Get Matched</div>
                      <div className="text-xs text-slate-600">Tell us about your skills and we'll find the perfect projects for you</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-bold text-sm">2</div>
                    <div>
                      <div className="font-medium text-sm text-slate-900">Work on Real Projects</div>
                      <div className="text-xs text-slate-600">Build amazing websites, create killer marketing campaigns, crunch numbers</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-bold text-sm">3</div>
                    <div>
                      <div className="font-medium text-sm text-slate-900">Earn Money & Experience</div>
                      <div className="text-xs text-slate-600">Get paid for your work while building an impressive portfolio</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-bold text-sm">4</div>
                    <div>
                      <div className="font-medium text-sm text-slate-900">Launch Your Career</div>
                      <div className="text-xs text-slate-600">Use your experience to land dream internships and full-time jobs</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-7 pt-5 border-t text-center">
                  <div className="mb-5 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                    <div className="text-xs font-semibold text-orange-700 mb-1">
                      ⚡ LIMITED TIME: Join 12+ students already earning
                    </div>
                    <div className="text-xs text-orange-600">
                      Applications closing soon - Apply today!
                    </div>
                  </div>
                  
                  <Button className="bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 hover:from-teal-700 hover:via-blue-700 hover:to-purple-700 text-white text-lg font-bold py-4 px-10 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
                    <Users className="mr-3 h-6 w-6" />
                    Apply as a Student
                  </Button>
                  
                  <div className="mt-5 text-xs text-slate-500">
                    No experience required • Flexible hours • Build your resume
                  </div>
                  <div className="mt-2 text-xs text-teal-600 font-semibold">
                    🚀 Earn $500-2000 per project while building your career!
                  </div>
                  
                  <div className="mt-3 flex items-center justify-center space-x-5 text-xs text-slate-600">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span>12+ Students Hired</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span>100% Success Rate</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">Five Specialized Divisions</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Each division is staffed by highly educated 3rd and 4th year university students with deep knowledge in
              their fields of study. Our rigorous vetting process ensures you get advanced expertise and fresh
              perspectives for your projects.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/launchtech" className="transform transition-all duration-700 hover:scale-105 hover:shadow-xl">
              <Card className="border-2 hover:border-teal-200 hover:shadow-lg transition-all cursor-pointer h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                    <Code className="h-6 w-6 text-teal-600" />
                  </div>
                  <CardTitle className="text-xl">LaunchTech Team</CardTitle>
                  <CardDescription>Web Development & IT Support</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• Basic business websites (5-page sites)</li>
                    <li>• Simple web applications</li>
                    <li>• IT support and maintenance</li>
                    <li>• Contact forms and integrations</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t">
                    <span className="text-sm font-medium text-slate-900">Perfect for: </span>
                    <span className="text-sm text-slate-600">Small businesses, startups</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/brightmarketing" className="transform transition-all duration-700 hover:scale-105 hover:shadow-xl">
              <Card className="border-2 hover:border-teal-200 hover:shadow-lg transition-all cursor-pointer h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <Megaphone className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle className="text-xl">BrightMarketing Crew</CardTitle>
                  <CardDescription>Digital Marketing & Social Media</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• Social media management</li>
                    <li>• Content creation and calendars</li>
                    <li>• Marketing campaign development</li>
                    <li>• Basic SEO optimization</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t">
                    <span className="text-sm font-medium text-slate-900">Perfect for: </span>
                    <span className="text-sm text-slate-600">Local shops, online brands</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/freshbooks" className="transform transition-all duration-700 hover:scale-105 hover:shadow-xl">
              <Card className="border-2 hover:border-teal-200 hover:shadow-lg transition-all cursor-pointer h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Calculator className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">FreshBooks Assist</CardTitle>
                  <CardDescription>Bookkeeping & Accounting</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• QuickBooks setup and management</li>
                    <li>• Invoice creation and tracking</li>
                    <li>• Account reconciliation</li>
                    <li>• Financial report generation</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t">
                    <span className="text-sm font-medium text-slate-900">Perfect for: </span>
                    <span className="text-sm text-slate-600">Solo entrepreneurs, freelancers</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/cleardesk" className="transform transition-all duration-700 hover:scale-105 hover:shadow-xl">
              <Card className="border-2 hover:border-teal-200 hover:shadow-lg transition-all cursor-pointer h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Headphones className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">ClearDesk Admin</CardTitle>
                  <CardDescription>Virtual Administration & CRM</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• Data entry and management</li>
                    <li>• CRM setup and maintenance</li>
                    <li>• Email and calendar management</li>
                    <li>• General administrative tasks</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t">
                    <span className="text-sm font-medium text-slate-900">Perfect for: </span>
                    <span className="text-sm text-slate-600">Consultants, service businesses</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/nexttutors" className="transform transition-all duration-700 hover:scale-105 hover:shadow-xl">
              <Card className="border-2 hover:border-teal-200 hover:shadow-lg transition-all cursor-pointer h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <GraduationCap className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl">NextTutors</CardTitle>
                  <CardDescription>Academic Tutoring Services</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• K-12 subject tutoring</li>
                    <li>• University-level assistance</li>
                    <li>• Test preparation support</li>
                    <li>• Custom learning plans</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t">
                    <span className="text-sm font-medium text-slate-900">Perfect for: </span>
                    <span className="text-sm text-slate-600">Parents, tutoring centers</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Card className="border-2 border-dashed border-slate-200 flex items-center justify-center transform transition-all duration-700 hover:scale-105 hover:shadow-xl">
              <CardContent className="text-center py-12">
                <Rocket className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="font-semibold text-slate-900 mb-2">Need Something Else?</h3>
                <p className="text-sm text-slate-600 mb-4">
                  We're always expanding our services based on client needs.
                </p>
                <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400">
                  <a href="#contact" className="flex items-center">
                    Contact Us
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">How It Works</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our streamlined process ensures quality results with minimal hassle for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center transform transition-all duration-700 hover:scale-105">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-teal-600">1</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Free Consultation</h3>
              <p className="text-sm text-slate-600">
                We discuss your needs and provide a detailed project scope with fixed pricing.
              </p>
            </div>

            <div className="text-center transform transition-all duration-700 hover:scale-105">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-teal-600">2</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Team Assignment</h3>
              <p className="text-sm text-slate-600">
                We assign a vetted 2-3 student team with relevant skills and experience.
              </p>
            </div>

            <div className="text-center transform transition-all duration-700 hover:scale-105">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-teal-600">3</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Project Execution</h3>
              <p className="text-sm text-slate-600">
                Students work on your project with full agency oversight and quality control.
              </p>
            </div>

            <div className="text-center transform transition-all duration-700 hover:scale-105">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-teal-600">4</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Delivery & Support</h3>
              <p className="text-sm text-slate-600">
                Professional delivery with ongoing support and satisfaction guarantee.
              </p>
            </div>
          </div>

          <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Typical Project Timeline: 2-5 Weeks</h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-teal-600 flex-shrink-0" />
                    <span>50% payment upfront to begin work</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-teal-600 flex-shrink-0" />
                    <span>Regular progress updates and check-ins</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-teal-600 flex-shrink-0" />
                    <span>50% final payment upon delivery and approval</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-teal-600 flex-shrink-0" />
                    <span>Ongoing support and revisions included</span>
                  </li>
                </ul>
              </div>
              <div className="bg-slate-50 rounded-xl p-6">
                <h4 className="font-semibold text-slate-900 mb-4">Payment Structure & Guarantee</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Project Start</span>
                    <span className="font-semibold text-slate-900">50%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Completion</span>
                    <span className="font-semibold text-slate-900">50%</span>
                  </div>
                  <div className="pt-3 border-t">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-slate-900">Total Project Fee</span>
                      <span className="font-bold text-teal-600">Fixed Price</span>
                    </div>
                  </div>
                  <div className="pt-3 border-t">
                    <div className="bg-green-50 rounded-lg p-3">
                      <p className="text-sm text-green-800 font-medium mb-1">100% Satisfaction Guarantee</p>
                      <p className="text-xs text-green-700">
                        Not satisfied after meeting your team and reviewing initial work? Get your 50% deposit back
                        before the project halfway point.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* For Businesses */}
            <div className="transform transition-all duration-700 hover:scale-105">
              <div className="space-y-4 mb-8">
                <Badge className="bg-blue-100 text-blue-800">For Businesses</Badge>
                <h2 className="text-3xl font-bold text-slate-900">Professional Results, Affordable Prices</h2>
                <p className="text-lg text-slate-600">
                  Get the expertise you need without the agency price tag or HR complications.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 transform transition-all duration-500 hover:translate-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <DollarSign className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Cost-Effective Solutions</h3>
                    <p className="text-slate-600 text-sm">
                      Save 40-60% compared to traditional agencies while maintaining professional quality.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 transform transition-all duration-500 hover:translate-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Risk-Free Guarantee</h3>
                    <p className="text-slate-600 text-sm">
                      Fixed-fee pricing with clear deliverables, professional delivery guarantee, and 50% refund
                      available before project halfway point if not satisfied.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 transform transition-all duration-500 hover:translate-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">No HR Headaches</h3>
                    <p className="text-slate-600 text-sm">
                      We handle all team management, quality control, and project coordination.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 transform transition-all duration-500 hover:translate-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Advanced Student Expertise</h3>
                    <p className="text-slate-600 text-sm">
                      Work with highly educated 3rd and 4th year students who bring deep knowledge and cutting-edge
                      skills from their studies.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Students */}
            <div className="transform transition-all duration-700 hover:scale-105">
              <div className="space-y-4 mb-8">
                <Badge className="bg-teal-100 text-teal-800">For Students</Badge>
                <h2 className="text-3xl font-bold text-slate-900">Real Experience, Fair Pay</h2>
                <p className="text-lg text-slate-600">
                  Build your career with guaranteed paid projects and professional mentorship.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 transform transition-all duration-500 hover:translate-x-2">
                  <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <DollarSign className="h-4 w-4 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Fair Compensation</h3>
                    <p className="text-slate-600 text-sm">
                      Minimum $17.20/hour equivalent with potential for $20-30/hour on efficient projects.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 transform transition-all duration-500 hover:translate-x-2">
                  <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="h-4 w-4 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Resume-Building Experience</h3>
                    <p className="text-slate-600 text-sm">
                      Work on real client projects that showcase your skills to future employers.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 transform transition-all duration-500 hover:translate-x-2">
                  <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="h-4 w-4 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Professional Support</h3>
                    <p className="text-slate-600 text-sm">
                      Work in managed teams with agency oversight and mentorship throughout projects.
                    </p>
                  </div>
                </div>
                
                <div className="pt-6 text-center">
                  <Button size="lg" className="bg-teal-600 hover:bg-teal-700 shadow-lg hover:shadow-xl transition-all duration-300">
                    <a href="https://calendar.app.google/bdmXF7zXBpFajxkb8" target="_blank" rel="noopener noreferrer" className="text-white flex items-center font-semibold">
                      Apply Now as Student
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <svg className="w-full h-20" viewBox="0 0 1200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Main funky path with more dramatic curves */}
            <path 
              d="M0 40 Q200 10 400 40 T800 40 T1200 40" 
              stroke="#0D9488" 
              strokeWidth="4" 
              fill="none"
              strokeLinecap="round"
            />
            {/* Secondary wavy line with more energy */}
            <path 
              d="M0 50 Q150 20 350 50 T750 50 T1200 50" 
              stroke="#14B8A6" 
              strokeWidth="3" 
              fill="none"
              strokeLinecap="round"
              opacity="0.8"
            />
            {/* Third playful line */}
            <path 
              d="M0 60 Q250 30 450 60 T850 60 T1200 60" 
              stroke="#5EEAD4" 
              strokeWidth="2" 
              fill="none"
              strokeLinecap="round"
              opacity="0.6"
            />
            {/* Fun dots along the path - more variety */}
            <circle cx="100" cy="40" r="5" fill="#0D9488"/>
            <circle cx="300" cy="40" r="4" fill="#14B8A6"/>
            <circle cx="500" cy="40" r="6" fill="#0D9488"/>
            <circle cx="700" cy="40" r="4" fill="#14B8A6"/>
            <circle cx="900" cy="40" r="5" fill="#0D9488"/>
            <circle cx="1100" cy="40" r="4" fill="#14B8A6"/>
            {/* Extra fun accent dots */}
            <circle cx="200" cy="50" r="3" fill="#5EEAD4"/>
            <circle cx="400" cy="50" r="2" fill="#0D9488" opacity="0.7"/>
            <circle cx="600" cy="50" r="3" fill="#5EEAD4"/>
            <circle cx="800" cy="50" r="2" fill="#0D9488" opacity="0.7"/>
            <circle cx="1000" cy="50" r="3" fill="#5EEAD4"/>
            {/* Tiny sparkle dots */}
            <circle cx="150" cy="65" r="1.5" fill="#0D9488" opacity="0.8"/>
            <circle cx="350" cy="65" r="1.5" fill="#14B8A6" opacity="0.8"/>
            <circle cx="550" cy="65" r="1.5" fill="#5EEAD4" opacity="0.8"/>
            <circle cx="750" cy="65" r="1.5" fill="#0D9488" opacity="0.8"/>
            <circle cx="950" cy="65" r="1.5" fill="#14B8A6" opacity="0.8"/>
            <circle cx="1150" cy="65" r="1.5" fill="#5EEAD4" opacity="0.8"/>
            {/* Fun squiggles for extra personality */}
            <path 
              d="M50 25 Q60 20 70 25" 
              stroke="#0D9488" 
              strokeWidth="2" 
              fill="none"
              strokeLinecap="round"
            />
            <path 
              d="M1150 25 Q1160 20 1170 25" 
              stroke="#14B8A6" 
              strokeWidth="2" 
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gradient-to-br from-slate-50 to-teal-50 relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-3">
          <div className="absolute top-20 left-10 w-16 h-16 bg-teal-200 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-12 h-12 bg-teal-300 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="text-center mb-10">
            <Badge className="bg-teal-600 text-white px-4 py-2 text-sm font-semibold shadow-md mb-4">
              Get Started Today
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Let's Discuss Your <span className="text-teal-600">Project</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Get in touch for a free consultation and detailed project proposal.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-10 items-start max-w-5xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/20">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                  <div className="w-2 h-6 bg-teal-600 rounded-full mr-3"></div>
                  Get In Touch
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 group">
                    <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
                      <Phone className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Phone</p>
                      <p className="text-slate-600">(555) 123-4567</p>
                      <p className="text-sm text-slate-500">Mon-Fri, 9AM-6PM EST</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 group">
                    <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
                      <Mail className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Email</p>
                      <p className="text-slate-600">hello@launchpathemployment.com</p>
                      <p className="text-sm text-slate-500">24/7 response time</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 group">
                    <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
                      <MapPin className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Service Area</p>
                      <p className="text-slate-600">North America (Remote Services)</p>
                      <p className="text-sm text-slate-500">Worldwide digital services</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Trust Indicators */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20">
                <h4 className="font-semibold text-slate-900 mb-3 flex items-center">
                  <Shield className="h-4 w-4 text-teal-600 mr-2" />
                  Why Choose LaunchPath?
                </h4>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-teal-600" />
                    <span>Free consultation with no obligation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-teal-600" />
                    <span>Detailed proposal within 24 hours</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-teal-600" />
                    <span>Student-friendly pricing guaranteed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-teal-600" />
                    <span>Quality work with satisfaction guarantee</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl blur opacity-20"></div>
              <Card className="relative bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-teal-600 to-teal-700 text-white pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                      <MessageCircle className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold">Request Free Consultation</CardTitle>
                      <CardDescription className="text-teal-100 mt-1">
                        Tell us about your project and we'll provide a detailed proposal within 24 hours.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <form onSubmit={handleSubmit} className="p-4">
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 flex items-center">
                          <User className="h-4 w-4 mr-2 text-teal-600" />
                          First Name
                        </label>
                        <Input 
                          placeholder="John" 
                          name="firstName" 
                          value={formData.firstName} 
                          onChange={handleInputChange} 
                          required 
                          className="border-2 border-slate-200 focus:border-teal-500 focus:ring-teal-500/20 transition-all duration-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 flex items-center">
                          <User className="h-4 w-4 mr-2 text-teal-600" />
                          Last Name
                        </label>
                        <Input 
                          placeholder="Smith" 
                          name="lastName" 
                          value={formData.lastName} 
                          onChange={handleInputChange} 
                          required 
                          className="border-2 border-slate-200 focus:border-teal-500 focus:ring-teal-500/20 transition-all duration-200"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-teal-600" />
                        Email Address
                      </label>
                      <Input 
                        type="email" 
                        placeholder="john@company.com" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        required 
                        className="border-2 border-slate-200 focus:border-teal-500 focus:ring-teal-500/20 transition-all duration-200"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 flex items-center">
                        <Building className="h-4 w-4 mr-2 text-teal-600" />
                        Company (Optional)
                      </label>
                      <Input 
                        placeholder="Your Company Name" 
                        name="company" 
                        value={formData.company} 
                        onChange={handleInputChange} 
                        className="border-2 border-slate-200 focus:border-teal-500 focus:ring-teal-500/20 transition-all duration-200"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 flex items-center">
                        <Rocket className="h-4 w-4 mr-2 text-teal-600" />
                        Service Needed
                      </label>
                      <select 
                        className="w-full border-2 border-slate-200 focus:border-teal-500 focus:ring-teal-500/20 rounded-md px-3 py-2 transition-all duration-200 bg-white" 
                        name="service" 
                        value={formData.service} 
                        onChange={handleInputChange} 
                        required
                      >
                        <option value="">Select a service...</option>
                        <option value="Web Development (LaunchTech)">🌐 Web Development (LaunchTech)</option>
                        <option value="Digital Marketing (BrightMarketing)">📢 Digital Marketing (BrightMarketing)</option>
                        <option value="Bookkeeping (FreshBooks Assist)">📊 Bookkeeping (FreshBooks Assist)</option>
                        <option value="Virtual Admin (ClearDesk)">💼 Virtual Admin (ClearDesk)</option>
                        <option value="Tutoring (NextTutors)">📚 Tutoring (NextTutors)</option>
                        <option value="Multiple Services">🎯 Multiple Services</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-teal-600" />
                        Project Details
                      </label>
                      <Textarea
                        placeholder="Tell us about your project, timeline, and requirements..."
                        rows={3}
                        name="projectDetails"
                        value={formData.projectDetails}
                        onChange={handleInputChange}
                        required
                        className="border-2 border-slate-200 focus:border-teal-500 focus:ring-teal-500/20 transition-all duration-200 resize-none"
                      />
                    </div>
                    
                    {submitMessage && (
                      <div className={`p-4 rounded-xl text-sm border-2 ${
                        submitMessage.includes("error") 
                          ? "bg-red-50 text-red-800 border-red-200" 
                          : "bg-green-50 text-green-800 border-green-200"
                      }`}>
                        <div className="flex items-center">
                          {submitMessage.includes("error") ? (
                            <AlertTriangle className="h-4 w-4 mr-2" />
                          ) : (
                            <CheckCircle className="h-4 w-4 mr-2" />
                          )}
                          {submitMessage}
                        </div>
                      </div>
                    )}
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold text-lg py-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Submitting...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <MessageCircle className="mr-2 h-5 w-5" />
                          Request Free Consultation
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
