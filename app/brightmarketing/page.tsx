import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Megaphone, Lightbulb, Camera, TrendingUp, CheckCircle, ArrowRight, GraduationCap, MapPin, Zap, BarChart3, Clock, DollarSign, Star, Target } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Footer from "@/components/footer"

export default function BrightMarketingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Division Logo & Hero */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center space-y-8">
            {/* Custom Division Logo */}
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center space-x-4 bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Megaphone className="h-8 w-8 text-orange-600" />
                </div>
                <div className="text-left">
                  <h1 className="text-3xl font-bold text-slate-900">BrightMarketing Crew</h1>
                  <p className="text-sm text-slate-600">Powered by LaunchPath Employment</p>
                </div>
              </div>
            </div>

            {/* Division Introduction */}
            <div className="max-w-4xl mx-auto space-y-6">
              <Badge className="bg-orange-100 text-orange-800">Digital Marketing & Social Media</Badge>
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">
                Amplify Your Brand with Creative Marketing Students
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                BrightMarketing Crew helps businesses enhance their online visibility and engage with their target
                audiences through effective digital marketing strategies. Our team consists of talented 3rd and 4th year
                Marketing, Communications, and Graphic Design students, managed by LaunchPath Employment for
                professional results.
              </p>
              <p className="text-slate-600">
                <strong>Perfect for:</strong> Local shops, online brands, small businesses looking to grow their social
                media presence and reach new customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Offered */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Marketing Services We Provide</h2>
            <p className="text-xl text-slate-600">Comprehensive digital marketing solutions for your business</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <Camera className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Social Media Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Complete social media account setup and ongoing content management
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Lightbulb className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Content Creation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">Engaging posts, graphics, and content calendars for your brand</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Marketing Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">Strategic email marketing and promotional campaign development</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CheckCircle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <CardTitle className="text-lg">SEO Basics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Basic search engine optimization to improve your online visibility
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
            <h2 className="text-3xl font-bold text-slate-900">Meet the BrightMarketing Crew</h2>
            <p className="text-xl text-slate-600">
              Creative Marketing & Communications students ready to grow your brand
            </p>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-dashed border-slate-300">
                  <span className="text-xs text-slate-500">Upload Photo</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">Maya Patel</h3>
                <p className="text-sm text-orange-600 mb-2">Creative Director • Marketing</p>
                <p className="text-sm text-slate-600">
                  4th year Marketing student at York University with expertise in brand strategy and campaign
                  development. Passionate about creating compelling visual narratives.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-dashed border-slate-300">
                  <span className="text-xs text-slate-500">Upload Photo</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">David Rodriguez</h3>
                <p className="text-sm text-orange-600 mb-2">Social Media Manager • Communications</p>
                <p className="text-sm text-slate-600">
                  3rd year Communications student at Carleton University specializing in social media strategy. Expert
                  in content creation and community engagement.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-dashed border-slate-300">
                  <span className="text-xs text-slate-500">Upload Photo</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">Zoe Williams</h3>
                <p className="text-sm text-orange-600 mb-2">Graphic Designer • Visual Arts</p>
                <p className="text-sm text-slate-600">
                  4th year Visual Arts student at OCAD University with strong skills in Adobe Creative Suite.
                  Specializes in brand identity and digital graphics.
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
            <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-2xl text-slate-900">Join the BrightMarketing Crew</CardTitle>
                <CardDescription className="text-lg">
                  Are you a Marketing, Communications, or Design student ready to make an impact?
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="space-y-4">
                  <p className="text-slate-700">
                    Join our creative team and work on exciting marketing campaigns for real businesses. Build your
                    portfolio, gain hands-on experience, and earn fair compensation while launching your marketing
                    career.
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-sm text-slate-600">
                    <MapPin className="h-4 w-4" />
                    <span>Open to students at Canadian universities only</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                    Apply to Join BrightMarketing
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
            <h2 className="text-3xl font-bold text-slate-900">Our Campaigns & Client Success</h2>
            <p className="text-xl text-slate-600">See our marketing work and client results</p>
          </div>

          <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
            <Megaphone className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-slate-900 mb-2">Portfolio Coming Soon</h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We're preparing a showcase of our best marketing campaigns, social media transformations, and client
              success stories. Check back soon to see examples of how we've helped businesses grow their online
              presence.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800 relative overflow-hidden">
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
                <span className="text-white/90 text-sm font-medium">Professional marketing at student prices</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                Ready to 
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent"> Grow</span> 
                Your Business?
              </h2>
              
              <p className="text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
                Join the growing list of satisfied clients who've transformed their businesses with our student teams.
                <span className="font-semibold text-white"> Free consultation</span> with no strings attached.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-white to-slate-100 text-orange-600 hover:from-slate-100 hover:to-white transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl font-bold text-lg px-8 py-6">
                  <Link href="/#contact" className="text-orange-600 flex items-center">
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
