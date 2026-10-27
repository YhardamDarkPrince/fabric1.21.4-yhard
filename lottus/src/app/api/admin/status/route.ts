import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';
import {adminSnapshot} from '@/lib/authorization';
import {ApiError} from '@/lib/errors';
export const dynamic='force-dynamic';
export async function GET(){try{const session=await getSession();if(!session)throw new ApiError('AUTHENTICATION_REQUIRED',401);return NextResponse.json(await adminSnapshot(session.id),{headers:{'Cache-Control':'no-store'}});}catch(e){return NextResponse.json({error:{code:e instanceof ApiError?e.code:'SERVICE_UNAVAILABLE'}},{status:e instanceof ApiError?e.status:503,headers:{'Cache-Control':'no-store'}});}}
