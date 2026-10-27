import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {Header} from '@/components/header';
import {Footer} from '@/components/footer';
import {Home} from '@/components/home';
import {Applications,ApplicationDetail,Pricing,Downloads,Documentation,Community,CloudPage,Account,Roadmap,Support,Legal,Suite,Developers} from '@/components/pages';
import {isLocale,locales,messages} from '@/lib/i18n';
import {applications} from '@/lib/catalog';
import {Admin} from '@/components/admin';
import {adminSnapshot} from '@/lib/authorization';
import {getSession} from '@/lib/auth';
export async function generateMetadata({params}:{params:Promise<{locale:string;slug?:string[]}>}):Promise<Metadata>{const{locale,slug=[]}=await params;if(!isLocale(locale))return{};const t=messages[locale];const names:Record<string,string>={applications:t.apps,suite:t.suite,pricing:t.pricing,downloads:t.downloads,docs:t.docs,community:t.community,cloud:t.cloud,account:t.account,roadmap:t.roadmap,support:t.support,developers:t.developers,legal:t.legal};const title=slug[0]?names[slug[0]]:'Sua criatividade. Sem limites.';const path=slug.length?'/'+slug.join('/'):'';return {title:locale==='pt-BR'?title:(slug[0]?title:t.hero1+' '+t.hero2),description:t.heroText,alternates:{canonical:`/${locale}${path}`,languages:Object.fromEntries(locales.map(l=>[l,`/${l}${path}`]))},openGraph:{title:`${title} · LOTTUS`,description:t.heroText,locale:locale.replace('-','_'),type:'website'}}}
export default async function Page({params,searchParams}:{params:Promise<{locale:string;slug?:string[]}>;searchParams:Promise<{error?:string}>}){const{locale,slug=[]}=await params;if(!isLocale(locale))notFound();const t=messages[locale];let page:React.ReactNode;const [route,id]=slug;
 if(slug.length>2)notFound();
 switch(route){case undefined:page=<Home locale={locale}/>;break;case 'suite':if(id)notFound();page=<Suite locale={locale}/>;break;case 'applications':if(id&&!applications.some(a=>a.id===id))notFound();page=id?<ApplicationDetail locale={locale} id={id}/>:<Applications locale={locale}/>;break;case 'pricing':page=<Pricing locale={locale}/>;break;case 'downloads':page=<Downloads locale={locale}/>;break;case 'docs':if(id&&!/^[0-9]$/.test(id))notFound();page=<Documentation locale={locale} topic={id}/>;break;case 'community':page=<Community locale={locale}/>;break;case 'cloud':page=<CloudPage locale={locale}/>;break;case 'account':{const session=await getSession();const query=await searchParams;page=<Account locale={locale} configured={Boolean(process.env.OIDC_CLIENT_ID&&process.env.DATABASE_URL)} error={Boolean(query.error)} user={session?{name:session.name,license:false}:undefined}/>;break;}case 'admin':{const session=await getSession();if(!session)notFound();try{const snapshot=await adminSnapshot(session.id);page=<Admin locale={locale} snapshot={snapshot}/>;}catch{notFound();}break;}case 'roadmap':page=<Roadmap locale={locale}/>;break;case 'support':page=<Support locale={locale}/>;break;case 'legal':if(!['terms','privacy','license'].includes(id))notFound();page=<Legal locale={locale} type={id}/>;break;case 'developers':page=<Developers locale={locale}/>;break;default:notFound();}
 if(id&&!['applications','docs','legal'].includes(route))notFound();
 return <><a className="skip-link" href="#main">{t.skipToContent}</a><Header locale={locale}/><main id="main">{page}</main><Footer locale={locale}/></>;
}
