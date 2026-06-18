import { NotFoundPage } from '@payloadcms/next/views'
import { importMap } from '../importMap'

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

const NotFound = ({ params, searchParams }: Args) =>
  // @ts-expect-error — Payload 3.x: import('@payload-config') typed as module namespace at compile time
  NotFoundPage({ config: import('@payload-config'), params, searchParams, importMap })

export default NotFound
