interface HowToStep {
  name: string
  text: string
  position: number
}

interface HowToSchemaProps {
  name: string
  description: string
  steps: HowToStep[]
}

/**
 * HowTo JSON-LD schema — used on the Execution page 5-step timeline.
 * Makes steps eligible for rich results in traditional and AI-powered search.
 */
export function HowToSchema({ name, description, steps }: HowToSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step) => ({
      '@type': 'HowToStep',
      position: step.position,
      name: step.name,
      text: step.text,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
