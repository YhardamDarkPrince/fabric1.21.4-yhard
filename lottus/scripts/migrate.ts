import {readFile,readdir} from 'node:fs/promises';
import {randomUUID} from 'node:crypto';
import {db,transaction} from '../src/lib/db';
import {applications} from '../src/lib/catalog';
await db().query('CREATE TABLE IF NOT EXISTS schema_migrations (version text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())');
for(const file of (await readdir('migrations')).filter(f=>f.endsWith('.sql')).sort()){
 await transaction(async c=>{await c.query("SELECT pg_advisory_xact_lock(hashtext('lottus-migrations'))");if((await c.query('SELECT 1 FROM schema_migrations WHERE version=$1',[file])).rowCount)return;await c.query(await readFile(`migrations/${file}`,'utf8'));await c.query('INSERT INTO schema_migrations(version) VALUES($1)',[file]);});
}
for(const a of applications)await db().query('INSERT INTO applications(id,name,content) VALUES($1,$2,$3) ON CONFLICT(id) DO UPDATE SET content=EXCLUDED.content',[a.id,a.name,JSON.stringify(a)]);
for(const[country,currency,provider]of[['BR','BRL','asaas'],['US','USD','stripe'],['DE','EUR','stripe']])await db().query('INSERT INTO regional_prices(id,country,currency,amount,provider) VALUES($1,$2,$3,1000,$4) ON CONFLICT(country,version) DO NOTHING',[randomUUID(),country,currency,provider]);
console.log('Migrations applied. Demonstration prices remain unapproved.');await db().end();
