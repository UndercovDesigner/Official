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
      <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-50 to-teal-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-100">Our Story</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-slate-900">
              Where Ambition Meets <span className="text-teal-600">Opportunity</span>
            </h1>
            <p className="text-xl lg:text-2xl text-slate-600 leading-relaxed">
              LaunchPath Employment helps students turn knowledge into paid experience — one real-world project at a
              time.
            </p>
            <div className="bg-white rounded-2xl p-8 shadow-lg text-left max-w-3xl mx-auto">
              <p className="text-lg text-slate-700 leading-relaxed">
              At LaunchPath, we believe students shouldn't have to wait until after graduation to start building their careers. With internships becoming increasingly competitive and limited, gaining real experience is harder than ever. That's why we match driven university students with real businesses in need of affordable, high-quality services — in marketing, web development, admin, finance, and more. We build teams. We manage projects. You gain experience, confidence, and pay — the way it should be.
              </p>
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

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-2xl lg:text-3xl font-bold text-slate-900">Founder & CEO</h3>
                  <div className="w-32 h-32 bg-slate-200 rounded-full flex items-center justify-center border-2 border-dashed border-slate-300">
                    <span className="text-sm text-slate-500">Upload Photo</span>
                  </div>
                </div>

                <div className="space-y-6">
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

              <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-8">
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
      <section className="py-20 bg-teal-600">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">We're Just Getting Started</h2>
            <p className="text-xl text-teal-100 leading-relaxed">
              Whether you're a student looking to build your future, or a business in need of real help — LaunchPath is
              here to create results that matter. Experience starts now.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-slate-100 font-semibold tracking-wide shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                <Link href="/#services" className="flex items-center">
                  Meet Our Teams
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                className="bg-white text-teal-600 hover:bg-slate-100 font-semibold tracking-wide shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                <Link href="/#contact" className="flex items-center">
                  Get in Touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                className="bg-white text-teal-600 hover:bg-slate-100 font-semibold tracking-wide shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                <a href="https://calendar.app.google/bdmXF7zXBpFajxkb8" target="_blank" rel="noopener noreferrer" className="flex items-center">
                  Apply to Join
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
