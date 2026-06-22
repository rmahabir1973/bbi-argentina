/**
 * Standalone migration generator — replicates exactly what `payload migrate:create` does
 * but run via `pnpm exec tsx` (v4.22.4) which handles moduleResolution:"bundler" correctly,
 * bypassing the internal tsx@4.19.2 tsImport path in Payload's bin.js.
 *
 * Usage:
 *   pnpm exec cross-env PAYLOAD_CONFIG_PATH=src/payload.config.ts tsx scripts/gen-migration.ts
 */
import payload from 'payload'
import config from '../src/payload.config'

void (async () => {
  // Mirrors what payload's migrate.js does for migrate:create
  await payload.init({
    config,
    disableDBConnect: true,
    disableOnInit: true,
  })

  const adapter = payload.db
  if (!adapter) throw new Error('No database adapter found')

  await adapter.createMigration({
    migrationName: 'initial',
    payload,
    skipEmpty: false,
  })

  payload.logger.info('Migration created successfully.')
  process.exit(0)
})()
