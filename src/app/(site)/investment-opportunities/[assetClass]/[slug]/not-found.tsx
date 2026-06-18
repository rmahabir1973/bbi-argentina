import Link from "next/link"
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema"

export default function AssetNotFound() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Investment Opportunities', url: '/investment-opportunities' },
        ]}
      />
      <section className="section bg-brand-limestone">
        <div className="container-site max-w-2xl">
          <h1 className="font-display text-display-lg text-brand-ink mb-4">
            Asset No Longer Available
          </h1>
          <p className="text-body text-brand-slate mb-8">
            BBI Argentina reviews its portfolio on a rolling basis. This asset is no longer available
            in the current portfolio. View current off-market opportunities below.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/investment-opportunities" className="btn-primary">
              View Current Opportunities
            </Link>
            <Link href="/contact?type=criteria-submission" className="btn-secondary">
              Submit Investment Criteria
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
