import {ApiError} from './errors';
/** Convert a provider decimal with two minor digits without floating-point multiplication. */
export function decimalToMinor(value:unknown){if(typeof value!=='number'&&typeof value!=='string')throw new ApiError('INVALID_PROVIDER_AMOUNT');const raw=String(value);if(!/^\d+(?:\.\d{1,2})?$/.test(raw))throw new ApiError('INVALID_PROVIDER_AMOUNT');const[whole,fraction='']=raw.split('.');const result=BigInt(whole)*100n+BigInt(fraction.padEnd(2,'0'));if(result>BigInt(Number.MAX_SAFE_INTEGER))throw new ApiError('AMOUNT_OUT_OF_RANGE');return Number(result);}
