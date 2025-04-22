import { Award } from "lucide-react"
import Section from "@/components/section"

interface Certification {
  name: string
  issueDate: string
}

export default function Certifications() {
  const certifications: Certification[] = [
    { name: "Microsoft Cybersecurity Architect Expert", issueDate: "Sept. 2022" },
    { name: "Microsoft Identity and Access Administrator", issueDate: "Sept. 2022" },
    { name: "Microsoft Security, Compliance and Identity Fundamentals", issueDate: "Sept. 2022" },
    { name: "Azure Security Engineer", issueDate: "Sept. 2022" },
    { name: "Google Associate Cloud Engineer", issueDate: "Aug. 2021" },
    { name: "Google Professional Cloud Architect", issueDate: "Aug. 2021" },
    { name: "CCSK (Certificate of Cloud Security Knowledge)", issueDate: "Aug. 2021" },
    { name: "Azure Solutions Architect Expert", issueDate: "Aug. 2021" },
    { name: "Google Project Management Certificate", issueDate: "Apr. 2020" },
    { name: "AWS Solutions Architect Associate", issueDate: "Apr. 2020" },
    { name: "AWS Cloud Practitioner", issueDate: "Apr. 2020" },
    { name: "Cambridge English: Advanced (CAE), C1", issueDate: "Apr. 2018" },
  ]

  return (
    <Section id="certifications" title="Certifications">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certifications.map((cert, index) => (
          <div key={index} className="flex items-start">
            <Award size={20} className="text-primary mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-foreground">{cert.name}</h3>
              <p className="text-sm text-muted-foreground">Issued {cert.issueDate}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
