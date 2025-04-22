import { GraduationCap } from "lucide-react"
import Section from "@/components/section"

export default function Education() {
  return (
    <Section id="education" title="Education">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-primary">University of Calabria</h3>
          <div className="text-foreground mt-1">Rende, Italy</div>
          <div className="flex items-center text-muted-foreground mt-2">
            <GraduationCap size={18} className="mr-2" />
            <span>Bachelor and Master Engineer's Degree in Computer Engineering, with focus on cybersecurity</span>
          </div>
        </div>
        <div className="mt-2 md:mt-0 text-muted-foreground md:text-right">
          <div>2018 - 2023</div>
        </div>
      </div>
    </Section>
  )
}
