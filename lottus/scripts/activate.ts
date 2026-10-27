import {readFile} from 'node:fs/promises';
import {verifyReceipt} from '../src/lib/activation';
const[receiptFile,publicKeyFile]=process.argv.slice(2);if(!receiptFile||!publicKeyFile){console.error('Usage: npm run simulate -- receipt.jwt public-key.pem');process.exit(1);}const claims=await verifyReceipt((await readFile(receiptFile,'utf8')).trim(),await readFile(publicKeyFile,'utf8'));console.log(JSON.stringify({verified:true,schemaVersion:claims.schemaVersion,scope:claims.scope,deviceId:claims.deviceId}));
