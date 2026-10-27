'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {isLocale,messages} from '@/lib/i18n';
export default function NotFound(){const raw=usePathname().split('/')[1],locale=isLocale(raw)?raw:'pt-BR',t=messages[locale];return <main className="not-found"><span className="eyebrow" style={{justifyContent:'center'}}>LOTTUS · 404</span><h1>{t.notFound}</h1><p>{t.notFoundText}</p><Link href={`/${locale}`} className="button button-primary">{t.backHome} →</Link></main>}
