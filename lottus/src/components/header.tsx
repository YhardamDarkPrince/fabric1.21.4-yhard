'use client';
import Link from 'next/link';
import {useState,useEffect,useRef} from 'react';
import {usePathname} from 'next/navigation';
import {ChevronDown,Globe2,Menu,X,ArrowUpRight,UserRound} from 'lucide-react';
import {Lotus} from './icons';
import {messages,localeNames,locales,type Locale} from '@/lib/i18n';
export function Header({locale}:{locale:Locale}) {
 const t=messages[locale],path=usePathname();const[menu,setMenu]=useState(false),[language,setLanguage]=useState(false);const langRef=useRef<HTMLDivElement>(null);
 useEffect(()=>{const handle=(e:MouseEvent)=>{if(!langRef.current?.contains(e.target as Node))setLanguage(false)};document.addEventListener('click',handle);return()=>document.removeEventListener('click',handle)},[]);
 useEffect(()=>{setMenu(false);setLanguage(false);localStorage.setItem('lottus-locale',locale);document.cookie=`lottus-locale=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;document.documentElement.lang=locale},[path,locale]);
 const routes=[['suite',t.suite],['applications',t.apps],['community',t.community],['docs',t.docs],['downloads',t.downloads],['cloud',t.cloud],['pricing',t.pricing]];
 return <header className="site-header"><div className="header-inner"><Link href={`/${locale}`} className="brand" aria-label="LOTTUS Creative Services"><Lotus/><span>LOTTUS<small>CREATIVE SERVICES</small></span></Link><nav className={menu?'main-nav open':'main-nav'} aria-label={t.product}>{routes.map(([route,label])=><Link className={path.includes('/'+route)?'active':''} href={`/${locale}/${route}`} key={route}>{label}{route==='cloud'&&<span className="nav-dot"/>}</Link>)}</nav><div className="header-actions"><div className="language" ref={langRef}><button className="language-button" aria-label="Language / Idioma" aria-expanded={language} onClick={()=>setLanguage(!language)} onKeyDown={e=>{if(e.key==='Escape')setLanguage(false)}}><Globe2 size={16}/><span>{locale==='pt-BR'?'PT':locale.toUpperCase()}</span><ChevronDown size={12}/></button>{language&&<div className="language-options">{locales.map(l=><Link key={l} href={path.replace(/^\/[^/]+/,`/${l}`)} lang={l} aria-current={l===locale?'true':undefined}>{localeNames[l]}{l===locale&&<span>✓</span>}</Link>)}</div>}</div><Link href={`/${locale}/account`} className="account-link" aria-label={t.account}><UserRound size={15}/><span>{t.account}</span><ArrowUpRight size={14}/></Link><button className="mobile-toggle" onClick={()=>setMenu(!menu)} aria-label={menu?t.close:t.menu} aria-expanded={menu}>{menu?<X/>:<Menu/>}</button></div></div></header>
}
