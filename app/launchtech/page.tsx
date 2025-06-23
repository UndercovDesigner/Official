import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Monitor, Database, Globe, CheckCircle, ArrowRight, GraduationCap, MapPin, Zap, Clock, DollarSign, Star, Shield, Headphones } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Footer from "@/components/footer"

export default function LaunchTechPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Division Logo & Hero */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-teal-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center space-y-8">
            {/* Custom Division Logo */}
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center space-x-4 bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-16 h-16 bg-teal-100 rounded-xl flex items-center justify-center">
                  <Code className="h-8 w-8 text-teal-600" />
                </div>
                <div className="text-left">
                  <h1 className="text-3xl font-bold text-slate-900">LaunchTech Team</h1>
                  <p className="text-sm text-slate-600">Powered by LaunchPath Employment</p>
                </div>
              </div>
            </div>

            {/* Division Introduction */}
            <div className="max-w-4xl mx-auto space-y-6">
              <Badge className="bg-teal-100 text-teal-800">Web Development & IT Support</Badge>
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">
                Professional Web Development by Top University Students
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                LaunchTech Team specializes in creating professional websites and providing essential IT support for
                small businesses and startups. Our team consists of highly skilled 3rd and 4th year Computer Science and
                Information Technology students, managed by LaunchPath Employment to ensure quality and professionalism.
              </p>
              <p className="text-slate-600">
                <strong>Perfect for:</strong> Small businesses, startups, entrepreneurs who need a professional online
                presence without the high cost of traditional web development agencies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Offered */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-slate-900">What We Build</h2>
            <p className="text-xl text-slate-600">Professional web solutions tailored to your business needs</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <Globe className="h-8 w-8 text-teal-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Business Websites</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  5-page professional websites with modern design and mobile responsiveness
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Monitor className="h-8 w-8 text-teal-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Web Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">Simple web apps and interactive features for your business</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Database className="h-8 w-8 text-teal-600 mx-auto mb-2" />
                <CardTitle className="text-lg">IT Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">General IT support and website maintenance services</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CheckCircle className="h-8 w-8 text-teal-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Contact Forms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">Contact form integration and email setup</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Meet the LaunchTech Team</h2>
            <p className="text-xl text-slate-600">
              Talented Computer Science & IT students ready to build your project
            </p>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-dashed border-slate-300">
                  <span className="text-xs text-slate-500">Upload Photo</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">Alex Chen</h3>
                <p className="text-sm text-teal-600 mb-2">Team Lead • Computer Science</p>
                <p className="text-sm text-slate-600">
                  4th year CS student at University of Toronto specializing in full-stack web development. Experienced
                  with React, Node.js, and database design.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-dashed border-slate-300">
                  <span className="text-xs text-slate-500">Upload Photo</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">Sarah Martinez</h3>
                <p className="text-sm text-teal-600 mb-2">Frontend Developer • Software Engineering</p>
                <p className="text-sm text-slate-600">
                  3rd year Software Engineering student at UBC with a passion for UI/UX design. Skilled in modern
                  JavaScript frameworks and responsive design.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-dashed border-slate-300">
                  <span className="text-xs text-slate-500">Upload Photo</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">Jordan Kim</h3>
                <p className="text-sm text-teal-600 mb-2">Backend Developer • Information Technology</p>
                <p className="text-sm text-slate-600">
                  4th year IT student at McGill University focusing on server architecture and API development. Expert
                  in Python, databases, and cloud services.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Apply to Join Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-teal-50 to-blue-50 border-teal-200">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-8 w-8 text-teal-600" />
                </div>
                <CardTitle className="text-2xl text-slate-900">Join the LaunchTech Team</CardTitle>
                <CardDescription className="text-lg">
                  Are you a Computer Science or IT student looking for real-world experience?
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="space-y-4">
                  <p className="text-slate-700">
                    Join our team of talented students and work on exciting web development projects while earning fair
                    compensation. Gain valuable experience, build your portfolio, and launch your career with LaunchPath
                    Employment.
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-sm text-slate-600">
                    <MapPin className="h-4 w-4" />
                    <span>Open to students at Canadian universities only</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                    Apply to Join LaunchTech
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <p className="text-sm text-slate-500">
                    Application form link coming soon. We'll be recruiting for our next project cycle.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Past Projects & Testimonials */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Our Work & Client Feedback</h2>
            <p className="text-xl text-slate-600">See what we've built and what our clients say</p>
          </div>

          <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
            <Code className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-slate-900 mb-2">Portfolio Coming Soon</h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We're preparing a showcase of our best web development projects, client testimonials, and success stories.
              Check back soon to see examples of websites and applications we've built for businesses like yours.
            </p>
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
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-4">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white/90 text-sm font-medium">Professional web development at student prices</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                Ready to Build Your 
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent"> Digital Presence</span>?
              </h2>
              
              <p className="text-xl text-teal-100 max-w-3xl mx-auto leading-relaxed">
                Join the growing list of satisfied clients who've transformed their businesses with our student teams.
                <span className="font-semibold text-white"> Free consultation</span> with no strings attached.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-white to-slate-100 text-teal-600 hover:from-slate-100 hover:to-white transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl font-bold text-lg px-8 py-6">
                  <Link href="/#contact" className="text-teal-600 flex items-center">
                    <Zap className="mr-3 h-5 w-5" />
                    Get Free Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white/20 transform hover:scale-105 transition-all duration-300 font-bold text-lg px-8 py-6"
                >
                  <Link href="/portfolio" className="text-white flex items-center">
                    <Globe className="mr-3 h-5 w-5" />
                    View Our Work
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              
              <div className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm border border-yellow-300/30 rounded-xl p-4 max-w-md mx-auto">
                <div className="flex items-center justify-center space-x-2 text-white">
                  <Clock className="h-4 w-4 text-yellow-300" />
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
