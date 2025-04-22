import { Building } from "lucide-react"
import Section from "@/components/section"

interface ExperienceItem {
  company: string
  role: string
  period: string
  location: string
  projects: {
    client: string
    description: string[]
  }[]
}

export default function Experience() {
  const experiences: ExperienceItem[] = [
    {
      company: "Freelancer",
      role: "Lead Software Engineer",
      period: "Sept. 2019 – now",
      location: "Lamezia Terme, Italy",
      projects: [
        {
          client: "DaVinci Salute, healthtech company owned by Unipol Group",
          description: [
            "Fully implemented a healthcare prevention application from scratch, including a doctor backoffice and a patient-facing frontend for submitting surveys and following health prevention paths. Utilized NestJS and Moleculer for microservices communication, and Vue.js for the frontend.",
            "Assisted the development team in building a full-stack, multi-tenant welfare application.",
          ],
        },
        {
          client: "Infocert, the largest Qualified Trust Service Provider in Europe",
          description: [
            "Developed Quarkus microservice architectures to manage public key infrastructure (PKI), including signature and assertion verification.",
            "Implemented a certificate blacklist provisioning system, encompassing a Golang Lambda backend and an Angular-based frontend.",
            "Designed and executed over 300 unit and integration tests, achieving comprehensive test coverage and enhancing system reliability.",
            "Conducted analysis for a high-level rule engine proof of concept (POC) to optimize decision-making processes.",
            "Integrated a trust engine microservice to enforce compliance configuration for claim assertions.",
          ],
        },
        {
          client: "Euronext, pan-European stock exchange and market infrastructure",
          description: [
            "Achieved a comprehensive test coverage, including integrated (85%), unit (90%), and end-to-end tests using Playwright and Vitest that decreased regression time from 5 days to 2 days.",
            "Designed and implemented all the frontend from scratch (featuring a Next.js frontend with high server-side rendering SSR and SEO capabilities) for an ML automatic trading application in the DVA Hedging project and different event-driven backend modules for an application to manage the entire fixed-income new-issue process in the Book Builder project.",
          ],
        },
        {
          client: "Neulabs, platform that acquires, builds and scales global D2C brands",
          description: [
            "Architected and implemented a distributed and highly scalable order dispatching system utilizing AWS EventBridge, AWS Lambda, and DynamoDB, improving processing efficiency and scalability by 30%.",
            "Implemented event-driven architecture to manage order lifecycle and dispatching, reducing latency and increasing system reliability in handling high volumes of transactions.",
            "Ensured seamless integration with third-party logistics providers and D2C platforms through microservices architecture, reducing downtime and improving fault tolerance.",
            "Designed and developed an order dispatch backoffice application using Vue.js with the Quasar framework, leveraging Quasar's powerful UI components, responsive design capabilities, and build tools to deliver a seamless and highly interactive user experience.",
          ],
        },
        {
          client: "Avvale, company on a mission to evolve business through the circular economy",
          description: [
            "Applied MicroService-Oriented Architecture principles to design and implement cloud-based modular code on Microsoft Azure.",
            "Implemented efficient data storage solutions leveraging Redis and MongoDB, enhancing data accessibility and retrieval processes.",
            "Spearheaded Appian-based application development, architecting and deploying low-code BPM solutions that integrated complex business workflows.",
          ],
        },
        {
          client: "Inavya Ventures, London-based Start-up that specialises in healthcare and medicine",
          description: [
            "Supported the development of front-end (web app) and back-end (data analysis / certification) solutions as part of an IoT and Industry 4.0 project.",
            "Developed IOT platform using React, REDUX, RxJS, NestJS, PostgreSQL, D3js, Elasticsearch, Apache Kafka, InfluxDB, Git and Docker.",
          ],
        },
      ],
    },
  ]

  return (
    <Section id="experience" title="Experience">
      {experiences.map((exp, index) => (
        <div key={index} className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-primary">{exp.role}</h3>
              <div className="flex items-center text-muted-foreground mt-1">
                <Building size={16} className="mr-2" />
                <span>{exp.company}</span>
              </div>
            </div>
            <div className="mt-2 md:mt-0 text-muted-foreground">
              <div>{exp.period}</div>
              <div className="text-right">{exp.location}</div>
            </div>
          </div>

          {exp.projects.map((project, projectIndex) => (
            <div key={projectIndex} className="mb-6">
              <h4 className="font-semibold text-foreground mb-2">{project.client}</h4>
              <ul className="list-disc pl-6 space-y-2">
                {project.description.map((desc, descIndex) => (
                  <li key={descIndex} className="text-foreground/90">
                    {desc}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </Section>
  )
}
