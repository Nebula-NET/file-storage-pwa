import { SET_USER_INFO } from "../actions/types";

const initialState = {
    publickey : '',
    storageLimit: '',
    storageUsed: ''
}


export const User = (state = initialState , action={})=>{
    const {type , payload} = action;
    switch (type) {

        case SET_USER_INFO: {
            return {
                ...state,
                publickey: payload.public_key,
                storageLimit: payload.storage_limit,
                storageUsed: payload.storage_used,
            }
        }
    
        default:
            return {...state}
    }
}
