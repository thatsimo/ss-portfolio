import { forwardRef } from "react"
import Section from "@/components/section"

const Summary = forwardRef<HTMLElement, {}>((props, ref) => {
  return (
    <Section id="summary" title="Summary" ref={ref}>
      <p className="text-foreground leading-relaxed">
        Results-oriented and detail-driven software engineer with a strong background in cloud engineering and a passion
        for ensuring software reliability. Experienced in designing and implementing cloud-native software architectures
        to guarantee the functionality and performance of applications. Adept at utilizing backend frameworks such as
        Quarkus, Spring Boot, ExpressJS and incorporating continuous integration tools like Jenkins, Bitbucket pipelines
        and Github Action. Proven track record of collaborating with development, business and QA teams to plan tasks
        and resolve issues early in the development process.
      </p>
    </Section>
  )
})

Summary.displayName = "Summary"

export default Summary
