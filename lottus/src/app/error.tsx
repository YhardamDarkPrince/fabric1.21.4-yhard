'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {isLocale,messages} from '@/lib/i18n';
export default function ErrorPage({reset}:{reset:()=>void}){const raw=usePathname().split('/')[1],locale=isLocale(raw)?raw:'pt-BR',t=messages[locale];const retry={'pt-BR':'Tentar novamente',en:'Try again',es:'Intentar de nuevo',de:'Erneut versuchen',ja:'もう一度試す'};return <main className="not-found"><span className="eyebrow" style={{justifyContent:'center'}}>LOTTUS</span><h1>{t.authError}</h1><div className="panel-actions" style={{justifyContent:'center'}}><button className="button button-primary" onClick={reset}>{retry[locale]}</button><Link className="button button-secondary" href={`/${locale}`}>{t.backHome}</Link></div></main>}
