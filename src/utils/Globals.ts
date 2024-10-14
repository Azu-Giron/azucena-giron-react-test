import { SHA256, enc } from 'crypto-js';
import { isNullOrUndefined } from './validations';

export const BASE_URL = "https://fakestoreapi.com/products"

export const encrypt = (text: string) => {
  return SHA256(text).toString(enc.Hex);
}

export const compare = (text: string, encryptedText: string | undefined) => {
  if(isNullOrUndefined(encryptedText)) return false
  return encrypt(text) === encryptedText
}