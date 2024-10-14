import { SHA256, enc, AES } from 'crypto-js';
import { isNullOrUndefined } from './validations';

export const BASE_URL = "https://fakestoreapi.com/products"

const key = "TEXT_KEY_1"

export const encryptPassword = (password: string) => {
  return SHA256(password).toString(enc.Hex);
}

export const comparePasswords = (password: string, encryptedPassword: string | undefined) => {
  if(isNullOrUndefined(encryptedPassword)) return false
  return encryptPassword(password) === encryptedPassword
}

export const encryptContent = (text: string) => {
  return AES.encrypt(text, key).toString();
}
export const decryptContent = (encryptedText: string) => {
  return AES.decrypt(encryptedText, key).toString(enc.Utf8)
}