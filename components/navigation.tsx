"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const sections = [
    { id: "summary", label: "Summary" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Technical Skills" },
    { id: "open-source-projects", label: "Open Source Projects" },
    { id: "education", label: "Education" },
    { id: "certifications", label: "Certifications" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      // Update active section based on scroll position
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop, offsetHeight } = element

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            break
          }
        }
      }

      // Check if page is scrolled for sticky header styling
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      })
      setActiveSection(id)
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <>
      {/* Mobile Navigation Toggle */}
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 transition-all duration-300 lg:hidden h-16",
          isScrolled ? "bg-[oklch(93.46%_0.0305_255.11)] border-b-2 border-black" : "bg-transparent",
        )}
      >
        <div className={cn("text-lg font-bold text-black")}>Simone Squillace</div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 border-2 border-black bg-[oklch(67.47%_0.1726_259.49)] shadow-neo hover:translate-y-1 hover:shadow-none transition-all rounded-lg"
          aria-label="Toggle menu"
        >
          <Menu size={24} className="text-black" />
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      <div
        className={cn("mobile-nav-overlay", isMobileMenuOpen && "open")}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Navigation Menu */}
      <nav className={cn("mobile-nav border-2 border-black rounded-r-lg", isMobileMenuOpen && "open")}>
        <div className="flex justify-between items-center mb-8 border-b-2 border-black pb-4">
          <h2 className="text-lg font-bold text-black">Navigation</h2>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 border-2 border-black bg-[oklch(67.47%_0.1726_259.49)] shadow-neo hover:translate-y-1 hover:shadow-none transition-all rounded-lg"
            aria-label="Close menu"
          >
            <X size={24} className="text-black" />
          </button>
        </div>

        <ul className="space-y-6">
          {sections.map((section) => (
            <li
              key={section.id}
              className="animate-slide-in"
              style={{ animationDelay: `${sections.indexOf(section) * 0.05}s` }}
            >
              <button
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  "text-base transition-all duration-200 font-bold rounded-lg h-10 min-w-[150px] flex items-center px-3",
                  activeSection === section.id
                    ? "bg-[oklch(67.47%_0.1726_259.49)] border-2 border-black shadow-neo text-black"
                    : "hover:bg-[oklch(67.47%_0.1726_259.49)] hover:border-2 hover:border-black hover:shadow-neo hover:text-black text-black",
                )}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Desktop Navigation */}
      <nav className="hidden lg:block sticky top-8 self-start w-64">
        <div className="border-2 border-black p-4 bg-white shadow-neo rounded-lg">
          <ul className="space-y-4">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    "text-base transition-all duration-200 font-bold w-full text-left rounded-lg h-10 flex items-center px-3",
                    activeSection === section.id
                      ? "bg-[oklch(67.47%_0.1726_259.49)] border-2 border-black shadow-neo text-black"
                      : "hover:bg-[oklch(67.47%_0.1726_259.49)] hover:border-2 hover:border-black hover:shadow-neo hover:text-black text-black",
                  )}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  )
}
