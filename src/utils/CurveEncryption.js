import kuknusSdk from 'js-kuknos-sdk';
import e2c from 'ed2curve'

import sodium_api from 'libsodium-wrappers';


export async function encryptCurve(data, pub) {
    await sodium_api.ready;
    data = JSON.stringify(data)
    var buf = Buffer.from(data)
    pub = kuknusSdk.StrKey.decodeEd25519PublicKey(pub)
    pub = e2c.convertPublicKey(pub)
    var secretData = sodium_api.crypto_box_seal(buf, pub)
    let base64String = btoa(secretData.reduce(function (data, byte) {
        return data + String.fromCharCode(byte);
    }, ''));
    
    return base64String
}

export async function decryptCurve(data, pub, sec) {
    await sodium_api.ready;
    var buf = Buffer.from(data, 'base64')
    pub = kuknusSdk.StrKey.decodeEd25519PublicKey(pub)
    pub = e2c.convertPublicKey(pub)
    sec = kuknusSdk.StrKey.decodeEd25519SecretSeed(sec)
    sec = e2c.convertSecretKey(sec)
    var encdata = sodium_api.crypto_box_seal_open(buf,pub,sec)
    // delete 92 code >> "/" 
        encdata = encdata.filter((e)=>{return e != 92})
    //
    var string = new TextDecoder().decode(encdata);
    string = JSON.parse(string)
    return string
}

