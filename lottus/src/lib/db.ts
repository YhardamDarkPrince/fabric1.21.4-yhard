import {Pool,type PoolClient} from 'pg';
const globalDb=globalThis as unknown as {lottusDb?:Pool};
export function db(){if(!process.env.DATABASE_URL)throw new Error('DATABASE_NOT_CONFIGURED');return globalDb.lottusDb??=new Pool({connectionString:process.env.DATABASE_URL,max:10,connectionTimeoutMillis:5000});}
export async function transaction<T>(fn:(client:PoolClient)=>Promise<T>){const c=await db().connect();try{await c.query('BEGIN');const result=await fn(c);await c.query('COMMIT');return result;}catch(e){await c.query('ROLLBACK');throw e;}finally{c.release();}}
