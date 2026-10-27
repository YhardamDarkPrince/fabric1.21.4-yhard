import {headers} from 'next/headers';
import {publicUrl} from '@/lib/config';
import type {Metadata} from 'next';
import {isLocale} from '@/lib/i18n';
import './globals.css';
export const metadata:Metadata={metadataBase:new URL(publicUrl()),title:{default:'LOTTUS — Creative Services',template:'%s · LOTTUS'},description:'Onze aplicativos. Um universo de possibilidades. Conheça a suíte criativa LOTTUS para Linux.',icons:{icon:'/icon.svg'}};
export default async function RootLayout({children,params}:{children:React.ReactNode;params:Promise<{locale?:string}>}){const locale=(await headers()).get('x-lottus-locale');return <html data-scroll-behavior="smooth" lang={locale&&isLocale(locale)?locale:'pt-BR'}><body>{children}</body></html>}
