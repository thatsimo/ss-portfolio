"use client"

import { Mail, Linkedin, Github, Phone, ArrowDown } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
  const scrollToSummary = () => {
    const summarySection = document.getElementById("summary")
    if (summarySection) {
      summarySection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="h-screen flex flex-col justify-center items-center relative overflow-hidden">
      {/* Content */}
      <div className="relative z-20 text-center w-full max-w-4xl mx-auto px-4 animate-fade-in">
        <div className="bg-[oklch(67.47%_0.1726_259.49)] border-4 border-black p-8 shadow-neo-lg mb-8 rounded-lg">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-center text-black">Simone Squillace</h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black">Software Engineer</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8">
          <Link
            href="tel:+393490732058"
            className="flex items-center gap-2 bg-white border-2 border-black px-3 md:px-4 py-2 shadow-neo hover:translate-y-1 hover:shadow-none transition-all font-bold rounded-lg text-black"
          >
            <Phone size={16} className="text-black" />
            <span>+39 349 073 2058</span>
          </Link>

          <Link
            href="mailto:simonewe99@gmail.com"
            className="flex items-center gap-2 bg-[oklch(67.47%_0.1726_259.49)] border-2 border-black px-3 md:px-4 py-2 shadow-neo hover:translate-y-1 hover:shadow-none transition-all font-bold rounded-lg text-black"
          >
            <Mail size={16} className="text-black" />
            <span>simonewe99@gmail.com</span>
          </Link>

          <Link
            href="https://linkedin.com/in/simone-squillace-455abb14b"
            target="_blank"
            className="flex items-center gap-2 bg-white border-2 border-black px-3 md:px-4 py-2 shadow-neo hover:translate-y-1 hover:shadow-none transition-all font-bold rounded-lg text-black"
          >
            <Linkedin size={16} className="text-black" />
            <span>LinkedIn</span>
          </Link>

          <Link
            href="https://github.com/thatsimo"
            target="_blank"
            className="flex items-center gap-2 bg-[oklch(67.47%_0.1726_259.49)] border-2 border-black px-3 md:px-4 py-2 shadow-neo hover:translate-y-1 hover:shadow-none transition-all font-bold rounded-lg text-black"
          >
            <Github size={16} className="text-black" />
            <span>GitHub</span>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToSummary}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center bg-[oklch(67.47%_0.1726_259.49)] border-2 border-black px-6 py-3 shadow-neo hover:translate-y-1 hover:shadow-none transition-all font-bold z-20 rounded-lg text-black"
        aria-label="Scroll to content"
      >
        <span className="flex items-center gap-2">
          Scroll Down <ArrowDown size={20} className="animate-bounce" />
        </span>
      </button>
    </section>
  )
}
