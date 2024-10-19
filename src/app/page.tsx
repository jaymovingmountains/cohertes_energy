'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { BatteryCharging, Zap, Sun, BarChart3, ChevronDown, Menu, X } from "lucide-react"
import Link from "next/link"
import { Orbitron } from 'next/font/google'

const orbitron = Orbitron({ subsets: ['latin'] })

export default function home() {
  const [scrollY, setScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const sectionRefs = {
    home: useRef<HTMLElement>(null),
    products: useRef<HTMLElement>(null),
    features: useRef<HTMLElement>(null),
    integration: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
    order: useRef<HTMLElement>(null),
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      const currentPosition = window.scrollY + 100 // Offset for header

      Object.entries(sectionRefs).forEach(([key, ref]) => {
        if (ref.current && ref.current.offsetTop <= currentPosition &&
            ref.current.offsetTop + ref.current.offsetHeight > currentPosition) {
          setActiveSection(key)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    sectionRefs[sectionId as keyof typeof sectionRefs].current?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' })
  const [orderForm, setOrderForm] = useState({
    product: '',
    quantity: 1,
    name: '',
    email: '',
    address: '',
    agreeTerms: false
  })

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Contact form submitted:', contactForm)
    alert('Thank you for your message. We will get back to you soon!')
    setContactForm({ name: '', email: '', message: '' })
  }

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Order submitted:', orderForm)
    alert('Thank you for your order. We will contact you soon to finalize the details.')
    setOrderForm({
      product: '',
      quantity: 1,
      name: '',
      email: '',
      address: '',
      agreeTerms: false
    })
  }

  const MobileMenu = () => (
    <div className={`fixed inset-0 bg-gradient-to-br from-blue-900 to-black z-50 transform ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center p-4">
          <Link className="flex items-center justify-center group" href="#home" onClick={() => scrollToSection('home')}>
            <div className="relative">
              <Zap className="h-8 w-8 text-yellow-400 transform transition-all duration-300 group-hover:rotate-12" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
            </div>
            <span className="ml-2 text-2xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 group-hover:skew-x-6 transition-transform duration-300" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              COHERTES
            </span>
          </Link>
          <button onClick={() => setMobileMenuOpen(false)} className="text-white">
            <X className="h-8 w-8" />
          </button>
        </div>
        <nav className="flex flex-col items-center mt-16 space-y-8">
          {['products', 'features', 'integration', 'contact'].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`text-xl font-medium text-white hover:text-yellow-400 transition-colors ${activeSection === section ? 'text-yellow-400' : ''}`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
          <Button onClick={() => scrollToSection('order')} className="mt-8 bg-yellow-400 text-blue-900 hover:bg-yellow-500">
            Order Now
          </Button>
        </nav>
      </div>
    </div>
  )

  return (
    <div className={`flex flex-col min-h-screen bg-gradient-to-br from-blue-900 to-black text-white ${orbitron.className}`}>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 lg:px-6 h-16 flex items-center bg-gradient-to-r from-blue-900 to-black bg-opacity-90 backdrop-blur-md">
        <Link className="flex items-center justify-center group" href="#home" onClick={() => scrollToSection('home')}>
          <div className="relative">
            <Zap className="h-8 w-8 text-yellow-400 transform transition-all duration-300 group-hover:rotate-12" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
          </div>
          <span className="ml-2 text-2xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 group-hover:skew-x-6 transition-transform duration-300" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            COHERTES
          </span>
        </Link>
        <nav className="hidden md:flex ml-auto gap-8">
          {['products', 'features', 'integration', 'contact'].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`text-sm font-medium hover:text-yellow-400 transition-colors ${activeSection === section ? 'text-yellow-400' : ''}`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </nav>
        <Button onClick={() => scrollToSection('order')} className="hidden md:block ml-4 bg-yellow-400 text-blue-900 hover:bg-yellow-500">
          Order Now
        </Button>
        <button onClick={() => setMobileMenuOpen(true)} className="ml-auto md:hidden text-yellow-400">
          <Menu className="h-6 w-6" />
        </button>
      </header>

      <MobileMenu />

      <main className="flex-1 pt-16">
        <section ref={sectionRefs.home} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 z-0 bg-gradient-to-br from-blue-900 via-purple-900 to-black"
            style={{
              backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundBlendMode: 'overlay',
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
                Accelerate
              </span>{" "}
              into the Future
            </h1>
            <p className="text-xl md:text-2xl mb-8 animate-fade-in-up animation-delay-200">
              Revolutionary EV charging solutions for a sustainable tomorrow
            </p>
            <Button 
              onClick={() => scrollToSection('products')} 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-blue-900 hover:from-yellow-500 hover:to-orange-600 animate-fade-in-up animation-delay-400 text-lg py-6 px-8"
            >
              Charge Forward
            </Button>
          </div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
            <ChevronDown className="h-12 w-12 text-yellow-400" />
          </div>
          <div className="absolute inset-0 z-10">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>
        </section>

        <section ref={sectionRefs.products} id="products" className="py-24 bg-gradient-to-br from-blue-900 to-black">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16 text-yellow-400">Our Charging Solutions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { icon: BatteryCharging, title: "DC Fast Chargers", description: "High-power charging solutions up to megawatt capacity" },
                { icon: Zap, title: "Commercial Chargers", description: "Reliable and efficient charging for businesses and fleets" },
                { icon: BarChart3, title: "All-in-One Systems", description: "Integrated solutions for streamlined installation" },
              ].map((product, index) => (
                <div key={index} className="flex flex-col items-center text-center group">
                  <div className="mb-6 p-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full text-blue-900 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <product.icon className="h-12 w-12" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-yellow-400">{product.title}</h3>
                  <p className="text-gray-300">{product.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section ref={sectionRefs.features} id="features" className="py-24 bg-gradient-to-tl from-blue-900 to-black">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16 text-yellow-400">Why Choose Cohertes Energy</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                { title: "Infinitely Scalable", description: "Grow from single chargers to large-scale installations" },
                { title: "High-Power Charging", description: "Experience the fastest charging speeds available" },
                { title: "Renewable Integration", description: "Seamlessly connect with solar and battery systems" },
                { title: "Versatile Solutions", description: "Customizable setups for every charging need" },
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 transform transition-all duration-300 group-hover:scale-125 group-hover:rotate-12" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-yellow-400">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section ref={sectionRefs.integration} id="integration" className="py-24 bg-gradient-to-br from-blue-900 to-black">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <h2 className="text-4xl font-bold mb-6 text-yellow-400">Seamless Integration</h2>
                <p className="text-gray-300 mb-8">
                  Our charging solutions integrate effortlessly with solar panels and Battery Energy Storage Systems (BESS),
                  creating a sustainable and efficient energy ecosystem.
                </p>
                <ul className="space-y-4">
                  {[
                    { icon: Sun, text: "Solar Panel Integration" },
                    { icon: BatteryCharging, text: "BESS Compatibility" },
                    { icon: Zap, text: "Smart Grid Technology" },
                  ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <item.icon className="h-6 w-6 text-yellow-400" />
                      <span className="text-gray-300">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:w-1/2">
                <div className="relative h-[400px] w-full bg-gradient-to-br from-blue-800 to-purple-900 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      <Sun className="absolute top-1/4 left-1/4 h-16 w-16 text-yellow-400 animate-pulse" />
                      <BatteryCharging className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-24 w-24 text-green-400 animate-pulse" />
                      <Zap className="absolute bottom-1/4 right-1/4 h-16 w-16 text-blue-400 animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section  ref={sectionRefs.contact} id="contact" className="py-24 bg-gradient-to-tl from-blue-900 to-black">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-4xl font-bold mb-6 text-center text-yellow-400">Contact Us</h2>
              <p className="text-xl mb-8 text-center text-gray-300">
                Ready to revolutionize your EV charging infrastructure? Get in touch with our experts.
              </p>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">Name</label>
                  <Input
                    id="name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-blue-800 border-blue-700 text-white placeholder-gray-400"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                  <Input
                    id="email"
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-blue-800 border-blue-700 text-white placeholder-gray-400"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">Message</label>
                  <Textarea
                    id="message"
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full bg-blue-800 border-blue-700 text-white placeholder-gray-400"
                    rows={4}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-blue-900 hover:from-yellow-500 hover:to-orange-600">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </section>

        <section ref={sectionRefs.order} id="order" className="py-24 bg-gradient-to-br from-blue-900 to-black">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto bg-gradient-to-br from-blue-800 to-purple-900 p-8 rounded-lg shadow-xl">
              <h2 className="text-4xl font-bold mb-6 text-center text-yellow-400">Order Now</h2>
              <form onSubmit={handleOrderSubmit} className="space-y-6">
                <div>
                  <label htmlFor="product" className="block text-sm font-medium mb-2 text-gray-300">Product</label>
                  <Select
                    value={orderForm.product}
                    onValueChange={(value) => setOrderForm(prev => ({ ...prev, product: value }))}
                    required
                  >
                    <SelectTrigger className="w-full bg-blue-800 border-blue-700 text-white">
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                    <SelectContent className="bg-blue-800 border-blue-700 text-white">
                      <SelectItem value="dc-fast-charger">DC Fast Charger</SelectItem>
                      <SelectItem value="commercial-charger">Commercial Charger</SelectItem>
                      <SelectItem value="all-in-one">All-in-One System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium mb-2 text-gray-300">Quantity</label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={orderForm.quantity}
                    onChange={(e) => setOrderForm(prev => ({ ...prev, quantity: parseInt(e.target.value) }))}
                    className="w-full bg-blue-800 border-blue-700 text-white"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="orderName" className="block text-sm font-medium mb-2 text-gray-300">Name</label>
                  <Input
                    id="orderName"
                    value={orderForm.name}
                    onChange={(e) => setOrderForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-blue-800 border-blue-700 text-white"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="orderEmail" className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                  <Input
                    id="orderEmail"
                    type="email"
                    value={orderForm.email}
                    onChange={(e) => setOrderForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-blue-800 border-blue-700 text-white"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium mb-2 text-gray-300">Address</label>
                  <Input
                    id="address"
                    value={orderForm.address}
                    onChange={(e) => setOrderForm(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full bg-blue-800 border-blue-700 text-white"
                    required
                  />
                </div>
                <div className="flex items-center">
                  <Checkbox
                    id="agreeTerms"
                    checked={orderForm.agreeTerms}
                    onCheckedChange={(checked) => setOrderForm(prev => ({ ...prev, agreeTerms: checked as boolean }))}
                    required
                  />
                  <label htmlFor="agreeTerms" className="ml-2 text-sm text-gray-300">
                    I agree to the terms and conditions
                  </label>
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-blue-900 hover:from-yellow-500 hover:to-orange-600">
                  Place Order
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gradient-to-br from-blue-900 to-black py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">© 2024 Cohertes Energy. All rights reserved.</p>
            <nav className="flex gap-6 mt-4 md:mt-0">
              <Link className="text-sm text-gray-400 hover:text-yellow-400 transition-colors" href="#">
                Terms of Service
              </Link>
              <Link className="text-sm text-gray-400 hover:text-yellow-400 transition-colors" href="#">
                Privacy Policy
              </Link>
              <button onClick={() => scrollToSection('contact')} className="text-sm text-gray-400 hover:text-yellow-400 transition-colors">
                Contact
              </button>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}