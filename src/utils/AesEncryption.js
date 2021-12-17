import CryptoJS from "crypto-js";


export function encryptAES(plainText, password) {
    try {
        let key = CryptoJS.MD5(password).toString()
        const encryptedBase64Key = btoa(key);
        const parsedBase64Key = CryptoJS.enc.Base64.parse(
            encryptedBase64Key
        );
        const cipherText = CryptoJS.AES.encrypt(plainText,parsedBase64Key,{
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7,
            }
        ).toString();
        return cipherText
    } catch (error) {
        throw new Error(error)
    }
}

export function decryptAES(cipherText, password) {
    let plainText = null
    try {
        let key = CryptoJS.MD5(password).toString()
        const encryptedBase64Key = btoa(key);
        const parsedBase64Key = CryptoJS.enc.Base64.parse(
            encryptedBase64Key
        );
        const bytes  = CryptoJS.AES.decrypt(cipherText, parsedBase64Key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        plainText = bytes.toString(CryptoJS.enc.Utf8);
        plainText = JSON.parse(plainText)

        return plainText
    } catch (error) {
        throw new Error(error)
    }

}


