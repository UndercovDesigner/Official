import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Users, MessageCircle, ArrowRight, GraduationCap, Briefcase, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Footer from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1920&h=1080&fit=crop&crop=center"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-teal-900/60"></div>
        </div>
        
        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="bg-teal-500 text-white hover:bg-teal-600 px-4 py-2 text-sm font-semibold shadow-lg">Our Story</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-lg">
              Where Ambition Meets <span className="text-teal-300 drop-shadow-lg">Opportunity</span>
            </h1>
            <p className="text-xl lg:text-2xl text-slate-100 leading-relaxed drop-shadow-md">
              LaunchPath Employment helps students turn knowledge into paid experience — one real-world project at a
              time.
            </p>
            <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-3xl p-8 lg:p-10 shadow-2xl text-left max-w-4xl mx-auto border border-slate-600/30 relative overflow-hidden">
              {/* Subtle background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent opacity-30"></div>
              <div className="relative z-10">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">Our Mission</h3>
                    <p className="text-lg text-slate-200 leading-relaxed">
                      At LaunchPath, we believe students shouldn't have to wait until after graduation to start building their careers. With internships becoming increasingly competitive and limited, gaining real experience is harder than ever. That's why we match driven university students with real businesses in need of affordable, high-quality services — in marketing, web development, admin, finance, and more. We build teams. We manage projects. You gain experience, confidence, and pay — the way it should be.
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-6 pt-4 border-t border-slate-600/50">
                  <div className="flex items-center space-x-2 text-sm text-slate-300">
                    <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                    <span className="font-medium">Student-focused</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-300">
                    <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                    <span className="font-medium">Business results</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-300">
                    <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                    <span className="font-medium">Real experience</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Founder */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Meet the Founder</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-2xl lg:text-3xl font-bold text-slate-900">Founder & CEO</h3>
                  <p className="text-lg text-slate-700 leading-relaxed">
                  LaunchPath Employment was created by a university student who understood the frustration of being told, "You need experience" — without being given the chance to earn it. That personal challenge became the foundation for a solution designed to help students build careers while helping small businesses grow.

Guided by firsthand experience, the founder remains actively involved in building client relationships, forming student teams, and ensuring project quality. The mission is simple: turn untapped student potential into real-world proof — through structured, paid, meaningful work.
                  </p>
                  <p className="text-lg text-slate-700 leading-relaxed">
                    What started as a response to rejection has become a platform helping students gain confidence,
                    build resumes, and deliver real results — all while helping small businesses grow. He's committed to
                    making LaunchPath a place where potential turns into proof.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Founder Image */}
                <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-4 border border-slate-300 shadow-lg">
                  <div className="flex justify-center">
                    <div className="w-40 h-52 bg-gradient-to-br from-teal-100 to-blue-100 rounded-xl overflow-hidden border-2 border-teal-300 shadow-lg">
                      <Image
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop&crop=face"
                        alt="Founder - LaunchPath Employment"
                        width={300}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Finance Student Description */}
                <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-8 border border-teal-200 shadow-lg">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <GraduationCap className="h-6 w-6 text-teal-600" />
                      <span className="font-semibold text-slate-900">Finance Student at Western University</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Briefcase className="h-6 w-6 text-teal-600" />
                      <span className="font-semibold text-slate-900">Entrepreneur & Problem Solver</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Heart className="h-6 w-6 text-teal-600" />
                      <span className="font-semibold text-slate-900">Passionate About Student Success</span>
                    </div>

                    <div className="pt-4 border-t border-teal-200">
                      <blockquote className="text-slate-700 italic">
                        "Every student deserves the chance to prove their potential before graduation. LaunchPath is that
                        chance."
                      </blockquote>
                      <cite className="text-sm text-slate-600 mt-2 block">— Founder, LaunchPath Employment</cite>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">Our Mission</h2>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                To give university students the chance to build their careers while helping real businesses grow — one
                project, one team, one success at a time.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center border-2 hover:border-teal-200 transition-colors">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Target className="h-8 w-8 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">🎯 Earned Experience</h3>
                  <p className="text-slate-600">
                    Every project adds real weight to a resume. Students work on meaningful projects that showcase their
                    skills to future employers.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-2 hover:border-teal-200 transition-colors">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="h-8 w-8 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">🤝 Mutual Growth</h3>
                  <p className="text-slate-600">
                    Clients get results, students grow skills. Our model creates win-win relationships that benefit
                    everyone involved.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-2 hover:border-teal-200 transition-colors">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MessageCircle className="h-8 w-8 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">💬 Clarity + Fairness</h3>
                  <p className="text-slate-600">
                    We value transparency, fair pay, and honest learning. Clear expectations and fair compensation for
                    quality work.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">What Makes Us Different</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-teal-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Hand-Picked Student Teams</h3>
                    <p className="text-slate-600">
                      Students are carefully selected and placed into specialized teams based on their skills and
                      experience.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-teal-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Fully Managed Projects</h3>
                    <p className="text-slate-600">
                      No HR headaches for clients. We handle team management, quality control, and project coordination.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-teal-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Guaranteed Fair Pay & Clear Scope</h3>
                    <p className="text-slate-600">
                      Students receive fair compensation, clear project scope, and portfolio-building work experience.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-teal-600 font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Specialized Service Divisions</h3>
                    <p className="text-slate-600">
                      Each division is tailored to specific services and skill sets, ensuring expert-level results.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join the Journey CTA */}
      <section className="py-16 bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-8 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-12 right-16 w-16 h-16 bg-white rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="container mx-auto px-4 lg:px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Main Content */}
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1 mb-2">
                <div className="w-2 h-2 bg-teal-300 rounded-full animate-pulse"></div>
                <span className="text-white/90 text-sm font-medium">Ready to get started?</span>
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                We're Just Getting 
                <span className="text-teal-200"> Started</span>
              </h2>
              
              <p className="text-lg text-teal-100 max-w-2xl mx-auto leading-relaxed">
                Whether you're a student looking to build your future, or a business in need of real help — 
                <span className="font-semibold text-white"> LaunchPath is here to create results that matter.</span>
              </p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <div className="text-xl font-bold text-white mb-1">12+</div>
                <div className="text-xs text-teal-100">Students Hired</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <div className="text-xl font-bold text-white mb-1">100%</div>
                <div className="text-xs text-teal-100">Success Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <div className="text-xl font-bold text-white mb-1">$500-2K</div>
                <div className="text-xs text-teal-100">Per Project</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-slate-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold px-6 py-3">
                <Link href="/#contact" className="flex items-center">
                  Get Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white/20 transform hover:scale-105 transition-all duration-300 font-semibold px-6 py-3"
              >
                <Link href="/portfolio" className="flex items-center">
                  View Our Work
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                className="bg-slate-800 text-white hover:bg-slate-900 transform hover:scale-105 transition-all duration-300 font-semibold px-6 py-3 shadow-lg hover:shadow-xl"
              >
                <a href="https://calendar.app.google/bdmXF7zXBpFajxkb8" target="_blank" rel="noopener noreferrer" className="flex items-center">
                  Apply as a Student
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
