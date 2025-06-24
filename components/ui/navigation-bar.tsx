"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
  Rocket,
  User,
  Code,
  Megaphone,
  Calculator,
  Headphones,
} from "lucide-react"

export default function NavigationBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault()
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
    // Close mobile menu if open
    setMobileMenuOpen(false)
  }

  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/">
            <Image
              src="/images/Launchlogo.png"
              alt="LaunchPath Logo"
              width={80}
              height={80}
              className="h-20 w-20 object-contain"
            />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          <Link href="/" className="group relative px-4 py-2 text-sm font-medium text-slate-700 hover:text-teal-600 transition-all duration-200 rounded-lg hover:bg-teal-50">
            <span className="relative z-10">Home</span>
            <div className="absolute inset-0 bg-teal-100 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-200 origin-center"></div>
          </Link>
          
          <Link href="/about" className="group relative px-4 py-2 text-sm font-medium text-slate-700 hover:text-teal-600 transition-all duration-200 rounded-lg hover:bg-teal-50">
            <span className="relative z-10">About</span>
            <div className="absolute inset-0 bg-teal-100 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-200 origin-center"></div>
          </Link>
          
          <div className="relative group">
            <button className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 hover:text-teal-600 transition-all duration-200 rounded-lg hover:bg-teal-50">
              <span className="relative z-10">Services</span>
              <svg className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Services Dropdown */}
            <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left scale-95 group-hover:scale-100">
              <div className="p-2">
                <Link href="/launchtech" className="flex items-center px-3 py-2 text-sm text-slate-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors duration-200">
                  <Code className="mr-3 h-4 w-4 text-teal-500" />
                  <div>
                    <div className="font-medium">Web Development</div>
                    <div className="text-xs text-slate-500">Custom websites & apps</div>
                  </div>
                </Link>
                <Link href="/brightmarketing" className="flex items-center px-3 py-2 text-sm text-slate-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors duration-200">
                  <Megaphone className="mr-3 h-4 w-4 text-teal-500" />
                  <div>
                    <div className="font-medium">Digital Marketing</div>
                    <div className="text-xs text-slate-500">SEO, social media & ads</div>
                  </div>
                </Link>
                <Link href="/freshbooks" className="flex items-center px-3 py-2 text-sm text-slate-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors duration-200">
                  <Calculator className="mr-3 h-4 w-4 text-teal-500" />
                  <div>
                    <div className="font-medium">Bookkeeping</div>
                    <div className="text-xs text-slate-500">Financial management</div>
                  </div>
                </Link>
                <Link href="/cleardesk" className="flex items-center px-3 py-2 text-sm text-slate-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors duration-200">
                  <Headphones className="mr-3 h-4 w-4 text-teal-500" />
                  <div>
                    <div className="font-medium">Administrative</div>
                    <div className="text-xs text-slate-500">Virtual assistance</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          
          <Link href="/portfolio" className="group relative px-4 py-2 text-sm font-medium text-slate-700 hover:text-teal-600 transition-all duration-200 rounded-lg hover:bg-teal-50">
            <span className="relative z-10">Portfolio</span>
            <div className="absolute inset-0 bg-teal-100 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-200 origin-center"></div>
          </Link>
          
          <Link href="/#contact" className="group relative px-4 py-2 text-sm font-medium text-slate-700 hover:text-teal-600 transition-all duration-200 rounded-lg hover:bg-teal-50">
            <span className="relative z-10">Contact</span>
            <div className="absolute inset-0 bg-teal-100 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-200 origin-center"></div>
          </Link>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="h-6 w-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        {/* Desktop CTA Buttons */}
        <div className="hidden lg:flex items-center space-x-3">
          <div className="relative group">
            <Button variant="outline" size="sm" className="border-slate-300 text-slate-600 hover:border-teal-300 hover:text-teal-600 transition-all duration-200 bg-white hover:bg-teal-50">
              <span className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                Login
              </span>
            </Button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              Coming Soon
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-yellow-100"></div>
            </div>
          </div>
          
          <div className="relative group">
            <Button size="sm" className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              <span className="flex items-center">
                <Rocket className="mr-2 h-4 w-4" />
                Get Started
              </span>
            </Button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              Coming Soon
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-yellow-100"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <Image
                  src="/images/Launchlogo.png"
                  alt="LaunchPath Logo"
                  width={150}
                  height={50}
                  className="h-12 w-auto"
                />
                <button 
                  className="p-2 rounded-lg hover:bg-slate-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg className="h-6 w-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <nav className="space-y-2">
                <Link href="/" className="block px-4 py-3 text-sm font-medium text-slate-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors duration-200">
                  Home
                </Link>
                <Link href="/about" className="block px-4 py-3 text-sm font-medium text-slate-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors duration-200">
                  About
                </Link>
                <Link href="/launchtech" className="block px-4 py-3 text-sm font-medium text-slate-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors duration-200">
                  Web Development
                </Link>
                <Link href="/brightmarketing" className="block px-4 py-3 text-sm font-medium text-slate-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors duration-200">
                  Digital Marketing
                </Link>
                <Link href="/freshbooks" className="block px-4 py-3 text-sm font-medium text-slate-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors duration-200">
                  Bookkeeping
                </Link>
                <Link href="/cleardesk" className="block px-4 py-3 text-sm font-medium text-slate-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors duration-200">
                  Administrative
                </Link>
                <Link href="/portfolio" className="block px-4 py-3 text-sm font-medium text-slate-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors duration-200">
                  Portfolio
                </Link>
                <Link href="/#contact" className="w-full block text-left px-4 py-3 text-sm font-medium text-slate-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors duration-200">
                  Contact
                </Link>
              </nav>
              
              <div className="mt-8 pt-6 border-t border-slate-200 space-y-3">
                <Button variant="outline" className="w-full border-slate-300 text-slate-600 hover:border-teal-300 hover:text-teal-600">
                  <User className="mr-2 h-4 w-4" />
                  Login
                </Button>
                <Button className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white">
                  <Rocket className="mr-2 h-4 w-4" />
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
} 