import Section from "@/components/section"

interface SkillCategory {
  category: string
  skills: string
}

export default function Skills() {
  const skillCategories: SkillCategory[] = [
    {
      category: "Languages",
      skills: "Javascript, TypeScript, Java, Golang, Python, Bash, SQL.",
    },
    {
      category: "Frameworks",
      skills:
        "Quarkus, Spring Boot, Playwright, Vitest, Fiber, Flask, Database NoSql (MongoDB, DynamoDB), RDBMS (Postgresql, MySQL, SQL Server), Quasar, Vuejs, React, Angular, Nextjs.",
    },
    {
      category: "Developer Tools",
      skills:
        "Appian, RedHat Enterprise Linux, Ubuntu, Bash, Git, Docker, Google Cloud Platform, AWS, Azure, Maven/Gradle, Grafana, Kibana, New Relic, Atlassan suite (Jira, Bitbucket, Confluence), Github, Gitlab, Postman.",
    },
    {
      category: "Cloud",
      skills:
        "Auto Scaling, EC2, ELB, Route 53, S3, Kong, Infrastructure Security, Incident Response, Access Management, Identity Management, API Gateway, Secure Gateway, OAuth2, SSO, OIDC, SAML.",
    },
  ]

  return (
    <Section id="skills" title="Technical Skills">
      <div className="space-y-4">
        {skillCategories.map((category, index) => (
          <div key={index}>
            <h3 className="text-lg font-semibold text-primary mb-2">{category.category}</h3>
            <p className="text-foreground">{category.skills}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
