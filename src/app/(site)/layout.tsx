import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SkipNav } from '@/components/layout/SkipNav'
import { OrganizationSchema } from '@/components/schema/OrganizationSchema'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <OrganizationSchema />
      <SkipNav />
      <SiteHeader />
      <main id="main-content">
        {children}
      </main>
      <SiteFooter />
    </>
  )
}