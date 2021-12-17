import { SET_LANGUAGE, SET_ONLINE, SET_THEME } from "../actions/types";




const initalState = {
    direction : localStorage.getItem('direction') ? localStorage.getItem('direction') : 'rtl',
    theme : localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light',
    language : localStorage.getItem('language') ? localStorage.getItem('language') : 'fa',
    online: window.navigator.onLine
}


export const Setting = (state = initalState , action={})=>{
    const {type , payload} = action;
    switch (type) {

        case SET_LANGUAGE : 
            return {
                ...state,
                language : payload,
                direction : payload === 'fa' ? 'rtl' : 'ltr'

            }
    
        case SET_THEME:
            return{
                ...state,
                theme : payload
            }    

        case SET_ONLINE:{
            return{
                ...state,
                online: payload
            }
        }

        default:
            return {...state}
    }
}