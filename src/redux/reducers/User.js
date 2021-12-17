
const initialState = {
    publickey : '',
    accessToken : '',
    refreshToken : '',
}


export const User = (state = initialState , action={})=>{
    const {type , payload} = action;
    switch (type) {

    
        default:
            return {...state}
    }
}
