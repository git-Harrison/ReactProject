import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.REACT_APP_MEMBER_SECRET_KEY;

export function EnCrypt(value) {
    if (typeof value !== 'string') {
        throw new Error("문자열이 아님");
    }
    let encrypted = CryptoJS.AES.encrypt(value, SECRET_KEY);
    return encrypted.toString();
}

export function DeCrypt(encryptedValue) {
    let decrypted = CryptoJS.AES.decrypt(encryptedValue, SECRET_KEY);
    return decrypted.toString(CryptoJS.enc.Utf8);
}
