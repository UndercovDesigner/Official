import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, BookOpen, Target, Award, ArrowRight, MapPin, Zap, BarChart3, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Footer from "@/components/footer"

export default function NextTutorsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Division Logo & Hero */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center space-y-8">
            {/* Custom Division Logo */}
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center space-x-4 bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center">
                  <GraduationCap className="h-8 w-8 text-purple-600" />
                </div>
                <div className="text-left">
                  <h1 className="text-3xl font-bold text-slate-900">NextTutors</h1>
                  <p className="text-sm text-slate-600">Powered by LaunchPath Employment</p>
                </div>
              </div>
            </div>

            {/* Division Introduction */}
            <div className="max-w-4xl mx-auto space-y-6">
              <Badge className="bg-purple-100 text-purple-800">Academic Tutoring Services</Badge>
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">
                Exceptional Academic Support from Top University Students
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                NextTutors connects university students with K-12 and university students in need of academic
                assistance. Our tutors are high-achieving 3rd and 4th year university students with strong academic
                records in their fields of study, managed by LaunchPath Employment to ensure quality educational
                support.
              </p>
              <p className="text-slate-600">
                <strong>Perfect for:</strong> Parents seeking quality tutoring for their children, private tutoring
                centers looking for skilled tutors, and students needing academic support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Offered */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Tutoring Services We Provide</h2>
            <p className="text-xl text-slate-600">Comprehensive academic support across all subjects and levels</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <BookOpen className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <CardTitle className="text-lg">K-12 Subject Tutoring</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Math, Science, English, Social Studies, and more for elementary through high school
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <GraduationCap className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <CardTitle className="text-lg">University-Level Assistance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Advanced tutoring in specialized university courses and subjects
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Test Preparation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">SAT, ACT, standardized test prep, and exam preparation support</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Custom Learning Plans</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Personalized learning strategies and study plans for individual needs
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Meet the NextTutors Team</h2>
            <p className="text-xl text-slate-600">
              High-achieving university students ready to help others succeed academically
            </p>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-dashed border-slate-300">
                  <span className="text-xs text-slate-500">Upload Photo</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">Emma Thompson</h3>
                <p className="text-sm text-purple-600 mb-2">Math & Science Tutor • Engineering Physics</p>
                <p className="text-sm text-slate-600">
                  4th year Engineering Physics student at University of Waterloo with 3.9 GPA. Specializes in calculus,
                  physics, and chemistry tutoring for high school students.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-dashed border-slate-300">
                  <span className="text-xs text-slate-500">Upload Photo</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">Lucas Anderson</h3>
                <p className="text-sm text-purple-600 mb-2">English & Writing Tutor • English Literature</p>
                <p className="text-sm text-slate-600">
                  3rd year English Literature student at McGill University with Dean's List recognition. Expert in essay
                  writing, grammar, and literature analysis.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-dashed border-slate-300">
                  <span className="text-xs text-slate-500">Upload Photo</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">Aisha Patel</h3>
                <p className="text-sm text-purple-600 mb-2">Biology & Chemistry Tutor • Pre-Med</p>
                <p className="text-sm text-slate-600">
                  4th year Life Sciences student at University of Toronto on pre-med track. Specializes in AP Biology,
                  Chemistry, and MCAT preparation.
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
            <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-2xl text-slate-900">Join the NextTutors Team</CardTitle>
                <CardDescription className="text-lg">
                  Are you a high-achieving university student passionate about helping others learn?
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="space-y-4">
                  <p className="text-slate-700">
                    Join our tutoring team and make a real difference in students' academic success. Share your
                    knowledge, develop your teaching skills, and earn fair compensation while helping others achieve
                    their educational goals.
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-sm text-slate-600">
                    <MapPin className="h-4 w-4" />
                    <span>Open to students at Canadian universities only</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                    Apply to Join NextTutors
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <p className="text-sm text-slate-500">
                    Application form link coming soon. We'll be recruiting for our next tutoring cycle.
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
            <h2 className="text-3xl font-bold text-slate-900">Student Success Stories</h2>
            <p className="text-xl text-slate-600">See how our tutoring has helped students achieve their goals</p>
          </div>

          <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
            <GraduationCap className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-slate-900 mb-2">Success Stories Coming Soon</h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We're preparing a showcase of our tutoring success stories, student testimonials, and academic
              improvements. Check back soon to see examples of how our NextTutors have helped students excel in their
              studies.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 relative overflow-hidden">
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
                <span className="text-white/90 text-sm font-medium">Professional tutoring at student prices</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                Ready to 
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent"> Accelerate</span> 
                Learning?
              </h2>
              
              <p className="text-xl text-indigo-100 max-w-3xl mx-auto leading-relaxed">
                Join the growing list of satisfied clients who've transformed their businesses with our student teams.
                <span className="font-semibold text-white"> Free consultation</span> with no strings attached.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-white to-slate-100 text-indigo-600 hover:from-slate-100 hover:to-white transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl font-bold text-lg px-8 py-6">
                  <Link href="/#contact" className="text-indigo-600 flex items-center">
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
                    <BarChart3 className="mr-3 h-5 w-5" />
                    View Our Results
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
