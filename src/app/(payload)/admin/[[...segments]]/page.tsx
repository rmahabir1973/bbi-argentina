import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap'
import type { Metadata } from 'next'

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
  // @ts-expect-error — Payload 3.x: import('@payload-config') typed as module namespace at compile time
  generatePageMetadata({ config: import('@payload-config'), params, searchParams })

const Page = ({ params, searchParams }: Args) =>
  // @ts-expect-error — Payload 3.x: import('@payload-config') typed as module namespace at compile time
  RootPage({ config: import('@payload-config'), params, searchParams, importMap })

export default Page
