import { Github, ExternalLink } from "lucide-react"
import Section from "@/components/section"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface Project {
  name: string
  description: string
  technologies: string[]
  repoUrl?: string
  demoUrl?: string
  features: string[]
}

export default function OpenSourceProjects() {
  const projects: Project[] = [
    {
      name: "Serverless Microservices Framework",
      description:
        "A comprehensive framework for building scalable microservices using serverless architecture on AWS. This project provides a template and toolkit for rapidly developing event-driven applications with minimal infrastructure management.",
      technologies: ["TypeScript", "AWS Lambda", "DynamoDB", "EventBridge", "Serverless Framework"],
      features: [
        "Event-driven architecture patterns with AWS EventBridge",
        "Automated deployment pipeline with infrastructure as code",
        "Comprehensive logging and monitoring setup",
        "Local development environment with offline capabilities",
      ],
    },
    {
      name: "Cloud Security Scanner",
      description:
        "An automated security scanning tool for cloud environments that identifies misconfigurations and compliance violations. Helps organizations maintain security best practices across their cloud infrastructure.",
      technologies: ["Go", "AWS SDK", "Azure SDK", "GCP SDK", "Docker"],
      features: [
        "Multi-cloud support for AWS, Azure, and GCP",
        "Customizable compliance frameworks (HIPAA, PCI DSS, GDPR)",
        "Detailed remediation recommendations",
        "Integration with CI/CD pipelines for continuous security validation",
      ],
    },
    {
      name: "Healthcare Data Platform",
      description:
        "An open-source platform for securely managing and analyzing healthcare data. Designed with HIPAA compliance in mind, it provides APIs for integrating with various healthcare systems while maintaining patient privacy.",
      technologies: ["Java", "Spring Boot", "PostgreSQL", "Redis", "Docker", "Kubernetes"],
      features: [
        "FHIR-compliant data models and APIs",
        "End-to-end encryption for sensitive patient data",
        "Audit logging for compliance requirements",
        "Scalable architecture for handling large datasets",
      ],
    },
    {
      name: "DevOps Toolkit",
      description:
        "A collection of scripts and tools for automating common DevOps tasks across different cloud providers. Streamlines infrastructure management, deployment processes, and monitoring setup.",
      technologies: ["Python", "Bash", "Terraform", "Ansible", "GitHub Actions"],
      features: [
        "Infrastructure as Code templates for multiple cloud providers",
        "Automated backup and disaster recovery scripts",
        "Performance monitoring and alerting setup",
        "Security hardening scripts for various server configurations",
      ],
    },
    {
      name: "Distributed Tracing Library",
      description:
        "A lightweight library for implementing distributed tracing in microservices architectures. Helps developers understand request flows across service boundaries and identify performance bottlenecks.",
      technologies: ["TypeScript", "Node.js", "OpenTelemetry", "Jaeger", "Prometheus"],
      features: [
        "Automatic context propagation across service boundaries",
        "Integration with popular observability platforms",
        "Minimal performance overhead",
        "Support for both synchronous and asynchronous communication patterns",
      ],
    },
  ]

  return (
    <Section id="open-source-projects" title="Open Source Projects">
      <div className="space-y-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className={cn(
              "border-2 border-black p-5 sm:p-6 project-card shadow-neo hover:translate-y-1 hover:shadow-none transition-all bg-[oklch(93.46%_0.0305_255.11)] rounded-lg",
              "animate-fade-in",
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl font-bold text-black">{project.name}</h3>
                <p className="mt-2 text-sm sm:text-base text-black">{project.description}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                {
                  project.repoUrl && (
                    <Link
                      href={project.repoUrl}
                      target="_blank"
                      className="flex items-center gap-1 text-xs sm:text-sm bg-white border-2 border-black px-2 sm:px-3 py-1.5 shadow-neo hover:translate-y-1 hover:shadow-none transition-all font-bold rounded-lg text-black"
                    >
                      <Github size={14} />
                      <span className="hidden sm:inline">Repository</span>
                      <span className="sm:hidden">Repo</span>
                    </Link>
                  )
                }
                {project.demoUrl && (
                  <Link
                    href={project.demoUrl}
                    target="_blank"
                    className="flex items-center gap-1 text-xs sm:text-sm bg-[oklch(67.47%_0.1726_259.49)] border-2 border-black px-2 sm:px-3 py-1.5 shadow-neo hover:translate-y-1 hover:shadow-none transition-all font-bold rounded-lg text-black"
                  >
                    <ExternalLink size={14} />
                    <span>Demo</span>
                  </Link>
                )}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-xs sm:text-sm font-bold mb-2 text-black">Key Features:</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pl-4">
                {project.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-black/90 text-xs sm:text-sm list-disc font-medium">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="text-xs bg-white border-2 border-black px-2 py-1 shadow-neo tech-tag font-bold rounded-lg text-black"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
