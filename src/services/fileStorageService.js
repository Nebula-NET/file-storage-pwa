import {BackendApi} from './API'

export class FileStorageService{
    constructor(){

    }

    getUserData(publickey){
        return new Promise((resolve, reject)=>{
            BackendApi.get(`/file-storage/user/${publickey}`)
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            });
        })
    }

}