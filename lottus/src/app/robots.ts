export const dynamic='force-dynamic';
import type {MetadataRoute} from 'next';
import {publicUrl} from '@/lib/config';
import {locales} from '@/lib/i18n';
export default function robots():MetadataRoute.Robots{return{rules:{userAgent:'*',allow:'/',disallow:['/api/',...locales.flatMap(l=>[`/${l}/account`,`/${l}/admin`])]},sitemap:publicUrl()+'/sitemap.xml'};}
