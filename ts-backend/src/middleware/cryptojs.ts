import CryptoJS from 'crypto-js';
import { secretKey } from './auth';

const secret = secretKey as string; 

export function encrypt(text: string): string {
    const ciphertext = CryptoJS.AES.encrypt(text, secret).toString();
    return ciphertext;
}

export function decrypt(ciphertext: string): string {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secret);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
}
