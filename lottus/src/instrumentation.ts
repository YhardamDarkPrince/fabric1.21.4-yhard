export async function register(){if(process.env.NEXT_RUNTIME==='nodejs'){const {assertProduction}=await import('./lib/config');assertProduction();}}
