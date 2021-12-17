
export class Wallet{
    constructor(){

    }

    getAccount(){
        return new Promise((resolve, reject)=>{
            try {
                let data = {
                    type: 'dapps',
                    method: 'get_account',
                    data: null
                }
                window.parent.postMessage(data, "*");
        
                window.addEventListener("message", (e)=>{
                    if(e.data.type === 'dapps_response' && e.data.method === 'get_account'){
                        resolve(e.data.data)
                    }
                });
            } catch (error) {
                reject(error)
            }
        })
    }

    signData(cipherText){
        return new Promise((resolve, reject)=>{
            try {
                let data = {
                    type: 'dapps',
                    method: 'sign_data',
                    data: cipherText
                }
                window.parent.postMessage(data, "*");
        
                window.addEventListener("message", (e)=>{
                    if(e.data.type === 'dapps_response' && e.data.method === 'sign_data'){
                        resolve(e.data.data)
                    }
                });
            } catch (error) {
                reject(error)
            }
        })
    }
}