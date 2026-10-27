import {test} from 'node:test';
import assert from 'node:assert/strict';
import {randomBytes,generateKeyPairSync} from 'node:crypto';
import {SignJWT,importPKCS8} from 'jose';
import {generateKey,encryptKey,decryptKey,fingerprint} from '../src/lib/license';
import {searchApps,applications} from '../src/lib/catalog';
import {locales,messages} from '../src/lib/i18n';
import {decimalToMinor} from '../src/lib/money';
import {verifyReceipt} from '../src/lib/activation';
for(const name of ['LICENSE_ENCRYPTION_KEY','LICENSE_LOOKUP_KEY'])process.env[name]=randomBytes(32).toString('base64');
test('keys have 160 random bits, distinct fingerprints and authenticated encryption',()=>{const key=generateKey(),other=generateKey();assert.match(key,/^LOTTUS-(?:[A-F0-9]{8}-){4}[A-F0-9]{8}$/);assert.notEqual(key,other);const encrypted=encryptKey(key,'entitlement-a');assert.equal(decryptKey(encrypted,'entitlement-a'),key);assert.ok(!encrypted.includes(key));assert.throws(()=>decryptKey(encrypted,'entitlement-b'));const parts=encrypted.split('.');parts[3]=(parts[3][0]==='A'?'B':'A')+parts[3].slice(1);assert.throws(()=>decryptKey(parts.join('.'),'entitlement-a'));assert.notEqual(fingerprint(key),fingerprint(other));});
test('catalog has exactly eleven stable unique IDs and content for every locale',()=>{assert.equal(applications.length,11);assert.equal(new Set(applications.map(a=>a.id)).size,11);for(const locale of locales){assert.equal(messages[locale].docTopics.length,10);for(const app of applications)assert.ok(app.descriptions[locale].length>20);}});
test('search handles accents, Japanese and category intersection',()=>{assert.equal(searchApps('pt-BR','MUSICA')[0]?.id,'sound');assert.equal(searchApps('ja','ピクセル')[0]?.id,'canvas');assert.equal(searchApps('en','canvas','writing').length,0);assert.equal(searchApps('de','xyz-nothing').length,0);});
test('offline receipt verifies asymmetric signatures and rejects changes or wrong scope',async()=>{const{privateKey,publicKey}=generateKeyPairSync('ed25519');const priv=await importPKCS8(privateKey.export({type:'pkcs8',format:'pem'}).toString(),'EdDSA'),pub=publicKey.export({type:'spki',format:'pem'}).toString();const sign=(scope:string)=>new SignJWT({scope,schemaVersion:1,deviceId:'device-a'}).setProtectedHeader({alg:'EdDSA',kid:'test-1'}).setIssuer('lottus-licensing').setAudience('lottus-desktop').setSubject('entitlement-a').sign(priv);const receipt=await sign('lottus-suite');assert.equal((await verifyReceipt(receipt,pub)).sub,'entitlement-a');const parts=receipt.split('.');parts[1]=Buffer.from(JSON.stringify({scope:'lottus-suite',schemaVersion:1,deviceId:'attacker'})).toString('base64url');await assert.rejects(verifyReceipt(parts.join('.'),pub));await assert.rejects(verifyReceipt(await sign('external-product'),pub));});

test('provider decimals convert exactly and reject fractions below a cent',()=>{assert.equal(decimalToMinor('10.01'),1001);assert.equal(decimalToMinor(10.1),1010);assert.equal(decimalToMinor('10'),1000);assert.throws(()=>decimalToMinor('0.001'));assert.throws(()=>decimalToMinor('-1'));assert.throws(()=>decimalToMinor('100000000000000000'));});
