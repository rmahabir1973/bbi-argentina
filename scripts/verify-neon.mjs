import pg from 'pg';
const { Client } = pg;

const client = new Client({
  connectionString: process.env.DATABASE_URI,
  ssl: { rejectUnauthorized: false },
});

await client.connect();

const tables = await client.query(
  "SELECT tablename FROM pg_tables WHERE schemaname='public' ORDER BY tablename"
);
console.log(`\n✅ Tables in Neon (${tables.rows.length} total):`);
tables.rows.forEach(r => console.log('  -', r.tablename));

const migrations = await client.query(
  "SELECT name, created_at FROM payload_migrations ORDER BY created_at"
);
console.log(`\n✅ payload_migrations (${migrations.rows.length} row(s)):`);
migrations.rows.forEach(r => console.log('  -', r.name, '@', r.created_at));

await client.end();
