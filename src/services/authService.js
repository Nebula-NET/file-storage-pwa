import {BackendApi} from './API'

export class AuthService{
    constructor(){

    }

    sentOpt(data){
        return new Promise((resolve, reject)=>{
            BackendApi.post('/authorization/send-otp',data)
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            });
        })
    }

    login(data){
        return new Promise((resolve, reject)=>{
            BackendApi.post('/authorization/login',data)
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            });
        })
    }
}