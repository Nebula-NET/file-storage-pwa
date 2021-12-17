import { SET_LANGUAGE, SET_THEME } from "./types"


export function SetLanguage(direction){
    return dispatch =>{
        localStorage.setItem('language' , direction)
        localStorage.setItem('direction' , direction === 'fa' ? 'rtl' : 'ltr')
        dispatch({
            type : SET_LANGUAGE,
            payload : direction
        })
    }
}

export function SetTheme(theme){
    return dispatch=>{
        dispatch({
            type : SET_THEME,
            payload : theme
        })
    }
}