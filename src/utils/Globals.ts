var CryptoJS = require('crypto-js');

export const BASE_URL = "https://fakestoreapi.com/products"

//Deberia estar en un .env o un archivo similar pero se coloca acá por tema ejemplo
const cryptoKey = "N4ch-Pr0duct5-3X4mplE"

export const encrypt = (text: string) => {
  return CryptoJS.AES.encrypt(text, cryptoKey).toString();
}