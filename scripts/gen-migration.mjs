/**
 * Standalone migration generator — programmatically calls createMigration
 * after initialising Payload, bypassing the bin.js/tsImport path.
 *
 * Run with: node --import ./node_modules/.pnpm/tsx@4.19.2/node_modules/tsx/dist/esm/index.mjs scripts/gen-migration.mjs
 *   (tsx resolves .ts imports; mjs extension skips tsx tsconfig lookup)
 */
import { getPayload, createMigration } from 'payload'
// Payload config is imported via tsx (resolves .ts)
const { default: config } = await import('../src/payload.config.ts')

const payload = await getPayload({ config, disableOnInit: true })

await createMigration({
  migrationName: 'initial',
  payload,
})

process.exit(0)
