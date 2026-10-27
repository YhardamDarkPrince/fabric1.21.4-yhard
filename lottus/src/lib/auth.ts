import {cookies} from 'next/headers';
import {createHash,randomBytes} from 'node:crypto';
import {EncryptJWT,jwtDecrypt} from 'jose';
import * as oidc from 'openid-client';
import {db,transaction} from './db';
import {secret,publicUrl,assertProduction} from './config';
import {randomUUID} from 'node:crypto';
export const sessionCookie='lottus-session';
export const hashToken=(value:string)=>createHash('sha256').update(value).digest('hex');
export async function oidcConfig(){assertProduction();if(!process.env.OIDC_CLIENT_ID||!process.env.OIDC_ISSUER)throw new Error('OIDC_NOT_CONFIGURED');return oidc.discovery(new URL(process.env.OIDC_ISSUER),process.env.OIDC_CLIENT_ID,process.env.OIDC_CLIENT_SECRET,undefined,{execute:process.env.DEPLOYMENT_ENV!=='production'&&process.env.ALLOW_LOCAL_OIDC==='true'?[oidc.allowInsecureRequests]:undefined});}
export async function sealFlow(data:Record<string,string>){return new EncryptJWT(data).setProtectedHeader({alg:'dir',enc:'A256GCM'}).setIssuedAt().setExpirationTime('10m').encrypt(secret('SESSION_ENCRYPTION_KEY'));}
export async function openFlow(value:string){return(await jwtDecrypt(value,secret('SESSION_ENCRYPTION_KEY'))).payload;}
export function cookieOptions(){return {httpOnly:true,secure:publicUrl().startsWith('https:'),sameSite:'lax' as const,path:'/'};}
export async function getSession(){const token=(await cookies()).get(sessionCookie)?.value;if(!token||!process.env.DATABASE_URL)return null;const {rows}=await db().query('SELECT u.id,u.display_name FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.token_hash=$1 AND s.expires_at>now()',[hashToken(token)]);return rows[0]?{id:rows[0].id as string,name:rows[0].display_name as string}:null;}
export async function provisionIdentity(issuer:string,subject:string,name:string){return transaction(async c=>{await c.query('SELECT pg_advisory_xact_lock(hashtext($1))',[JSON.stringify([issuer,subject])]);const existing=await c.query('SELECT user_id FROM identities WHERE issuer=$1 AND subject=$2',[issuer,subject]);if(existing.rows[0])return existing.rows[0].user_id as string;const id=randomUUID();await c.query('INSERT INTO users(id,display_name) VALUES($1,$2)',[id,name]);await c.query('INSERT INTO identities(id,user_id,issuer,subject) VALUES($1,$2,$3,$4)',[randomUUID(),id,issuer,subject]);return id;});}
export async function createSession(userId:string){const token=randomBytes(32).toString('base64url');await db().query("INSERT INTO sessions(token_hash,user_id,expires_at) VALUES($1,$2,now()+interval '8 hours')",[hashToken(token),userId]);return token;}
