"use client"

import { useRef } from "react"
import HeroSection from "@/components/hero-section"
import Navigation from "@/components/navigation"
import Experience from "@/components/sections/experience"
import Education from "@/components/sections/education"
import Skills from "@/components/sections/skills"
import Certifications from "@/components/sections/certifications"
import OpenSourceProjects from "@/components/sections/open-source-projects"
import Summary from "@/components/sections/summary"
import Footer from "@/components/footer"
import BackgroundAnimation from "@/components/background-animation"

export default function Home() {
  const summaryRef = useRef<HTMLElement>(null)

  return (
    <div className="min-h-screen relative">
      <BackgroundAnimation />
      <div className="relative z-10">
        <HeroSection />
        <div className="text-black">
          <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
            <Navigation />
            <main className="flex-1">
              <Summary ref={summaryRef} />
              <Experience />
              <Skills />
              <OpenSourceProjects />
              <Education />
              <Certifications />
            </main>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}
