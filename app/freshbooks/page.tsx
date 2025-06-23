import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calculator,
  DollarSign,
  FileText,
  BarChart3,
  CheckCircle,
  ArrowRight,
  GraduationCap,
  MapPin,
  TrendingUp,
  Users,
  Clock,
  Star,
  Zap,
  Shield,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Footer from "@/components/footer"

export default function FreshBooksPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Division Logo & Hero */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center space-y-8">
            {/* Custom Division Logo */}
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center space-x-4 bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
                  <Calculator className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-left">
                  <h1 className="text-3xl font-bold text-slate-900">FreshBooks Assist</h1>
                  <p className="text-sm text-slate-600">Powered by LaunchPath Employment</p>
                </div>
              </div>
            </div>

            {/* Division Introduction */}
            <div className="max-w-4xl mx-auto space-y-6">
              <Badge className="bg-green-100 text-green-800">Bookkeeping & Accounting Support</Badge>
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">
                Professional Financial Management by Accounting Students
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                FreshBooks Assist provides crucial financial support services to solo entrepreneurs and freelancers,
                ensuring accurate and organized financial records. Our team consists of skilled 3rd and 4th year
                Accounting, Finance, and Business Administration students, managed by LaunchPath Employment for
                professional standards.
              </p>
              <p className="text-slate-600">
                <strong>Perfect for:</strong> Solo entrepreneurs, freelancers, small business owners who need reliable
                bookkeeping and financial organization without the cost of a full-time accountant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Offered */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Financial Services We Provide</h2>
            <p className="text-xl text-slate-600">Complete bookkeeping solutions for your business</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <CardTitle className="text-lg">QuickBooks Setup</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Complete accounting system setup and configuration for your business
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <FileText className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Invoice Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">Invoice creation, tracking, and payment follow-up systems</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Account Reconciliation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">Monthly account reconciliation and transaction categorization</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <BarChart3 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Financial Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">Monthly financial reports and business performance summaries</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Meet the FreshBooks Assist Team</h2>
            <p className="text-xl text-slate-600">
              Skilled Accounting & Finance students ready to organize your finances
            </p>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-dashed border-slate-300">
                  <span className="text-xs text-slate-500">Upload Photo</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">Jessica Liu</h3>
                <p className="text-sm text-green-600 mb-2">Senior Bookkeeper • Accounting</p>
                <p className="text-sm text-slate-600">
                  4th year Accounting student at University of Toronto with CPA track experience. Specializes in
                  QuickBooks setup and financial statement preparation.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-dashed border-slate-300">
                  <span className="text-xs text-slate-500">Upload Photo</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">Michael Brown</h3>
                <p className="text-sm text-green-600 mb-2">Financial Analyst • Finance</p>
                <p className="text-sm text-slate-600">
                  3rd year Finance student at McMaster University with strong analytical skills. Expert in financial
                  reporting and budget analysis.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-dashed border-slate-300">
                  <span className="text-xs text-slate-500">Upload Photo</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">Amanda Foster</h3>
                <p className="text-sm text-green-600 mb-2">Tax Specialist • Business Administration</p>
                <p className="text-sm text-slate-600">
                  4th year Business Administration student at Queen's University with tax preparation experience.
                  Skilled in small business tax compliance and planning.
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
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-slate-900">Join the FreshBooks Assist Team</CardTitle>
                <CardDescription className="text-lg">
                  Are you an Accounting, Finance, or Business student passionate about helping businesses succeed?
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="space-y-4">
                  <p className="text-slate-700">
                    Join our financial services team and help real businesses organize their finances and make informed
                    decisions. Gain practical accounting experience, build your professional skills, and earn fair
                    compensation.
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-sm text-slate-600">
                    <MapPin className="h-4 w-4" />
                    <span>Open to students at Canadian universities only</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">
                    Apply to Join FreshBooks Assist
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
            <h2 className="text-3xl font-bold text-slate-900">Our Work & Client Success</h2>
            <p className="text-xl text-slate-600">See how we've helped businesses organize their finances</p>
          </div>

          <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
            <Calculator className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-slate-900 mb-2">Case Studies Coming Soon</h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We're preparing a showcase of our bookkeeping transformations, client testimonials, and financial success
              stories. Check back soon to see examples of how we've helped businesses streamline their financial
              processes.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-green-600 via-green-700 to-green-800 relative overflow-hidden">
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
                <span className="text-white/90 text-sm font-medium">Professional bookkeeping at student prices</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                Ready to 
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent"> Organize</span> 
                Your Finances?
              </h2>
              
              <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
                Join the growing list of satisfied clients who've transformed their businesses with our student teams.
                <span className="font-semibold text-white"> Free consultation</span> with no strings attached.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-white to-slate-100 text-green-600 hover:from-slate-100 hover:to-white transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl font-bold text-lg px-8 py-6">
                  <Link href="/#contact" className="text-green-600 flex items-center">
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
