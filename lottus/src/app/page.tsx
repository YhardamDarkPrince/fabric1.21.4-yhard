import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import {isLocale} from '@/lib/i18n';
export default async function Root(){const pref=(await cookies()).get('lottus-locale')?.value;redirect('/'+(pref&&isLocale(pref)?pref:'pt-BR'))}
