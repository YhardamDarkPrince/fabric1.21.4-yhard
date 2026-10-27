export const dynamic='force-dynamic';
import type {MetadataRoute} from 'next';
import {locales} from '@/lib/i18n';
import {applications} from '@/lib/catalog';
import {publicUrl} from '@/lib/config';
export default function sitemap():MetadataRoute.Sitemap{const paths=['','/suite','/applications','/pricing','/downloads','/docs','/community','/cloud','/roadmap','/support','/developers',...applications.map(a=>'/applications/'+a.id),...Array.from({length:10},(_,i)=>'/docs/'+i)];return locales.flatMap(l=>paths.map(p=>({url:`${publicUrl()}/${l}${p}`,alternates:{languages:Object.fromEntries(locales.map(other=>[other,`${publicUrl()}/${other}${p}`]))}})));}
