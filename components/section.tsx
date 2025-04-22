import { type ReactNode, forwardRef } from "react"

interface SectionProps {
  id: string
  title: string
  children: ReactNode
}

const Section = forwardRef<HTMLElement, SectionProps>(({ id, title, children }, ref) => {
  return (
    <section id={id} className="py-12 mb-16 animate-fade-in" ref={ref}>
      <div className="bg-[oklch(67.47%_0.1726_259.49)] border-2 border-black inline-block px-6 py-2 mb-8 shadow-neo rounded-lg">
        <h2 className="text-2xl font-bold text-black">{title}</h2>
      </div>
      <div className="border-2 border-black p-6 bg-white shadow-neo rounded-lg">{children}</div>
    </section>
  )
})

Section.displayName = "Section"

export default Section
