import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 text-white pt-16 pb-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-32 h-32 bg-teal-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-teal-300 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-4">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex flex-col items-center">
              <Image
                src="/images/Launchlogo.png"
                alt="LaunchPath Logo"
                width={224}
                height={112}
                className="h-28 max-h-28 w-auto object-contain"
              />
              <p className="text-teal-100 text-sm leading-relaxed mt-2 text-center">
                Connecting university students with businesses for professional, affordable project-based services. 
                Building the future workforce, one project at a time.
              </p>
            </div>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-teal-800 rounded-lg flex items-center justify-center hover:bg-teal-700 transition-colors">
                <Mail className="h-5 w-5 text-teal-200" />
              </div>
              <div className="w-10 h-10 bg-teal-800 rounded-lg flex items-center justify-center hover:bg-teal-700 transition-colors">
                <Phone className="h-5 w-5 text-teal-200" />
              </div>
              <div className="w-10 h-10 bg-teal-800 rounded-lg flex items-center justify-center hover:bg-teal-700 transition-colors">
                <MapPin className="h-5 w-5 text-teal-200" />
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white flex items-center">
              <div className="w-2 h-2 bg-teal-400 rounded-full mr-3"></div>
              Services
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/launchtech" className="text-teal-100 hover:text-white transition-colors flex items-center group">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/brightmarketing" className="text-teal-100 hover:text-white transition-colors flex items-center group">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link href="/freshbooks" className="text-teal-100 hover:text-white transition-colors flex items-center group">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Bookkeeping
                </Link>
              </li>
              <li>
                <Link href="/cleardesk" className="text-teal-100 hover:text-white transition-colors flex items-center group">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Virtual Admin
                </Link>
              </li>
              <li>
                <Link href="/nexttutors" className="text-teal-100 hover:text-white transition-colors flex items-center group">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Academic Tutoring
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white flex items-center">
              <div className="w-2 h-2 bg-teal-400 rounded-full mr-3"></div>
              Company
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-teal-100 hover:text-white transition-colors flex items-center group">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-teal-100 hover:text-white transition-colors flex items-center group">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#" className="text-teal-100 hover:text-white transition-colors flex items-center group">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  For Students
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-teal-100 hover:text-white transition-colors flex items-center group">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-teal-100 hover:text-white transition-colors flex items-center group">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white flex items-center">
              <div className="w-2 h-2 bg-teal-400 rounded-full mr-3"></div>
              Get In Touch
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-teal-800 rounded-lg flex items-center justify-center">
                  <Mail className="h-4 w-4 text-teal-200" />
                </div>
                <span className="text-teal-100">hello@launchpathemployment.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-teal-800 rounded-lg flex items-center justify-center">
                  <Phone className="h-4 w-4 text-teal-200" />
                </div>
                <span className="text-teal-100">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-teal-800 rounded-lg flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-teal-200" />
                </div>
                <span className="text-teal-100">North America (Remote)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-teal-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-teal-200 text-sm">
            © {new Date().getFullYear()} LaunchPath Employment. All rights reserved.
          </p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <Link href="#" className="text-teal-200 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-teal-200 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
} 