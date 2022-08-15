import * as api from '../api';
import {AUTH} from '../constant/actionType'

export const signUp = (formData, navigate) => async (dispatch)=>{
    try {
        const {data} = await api.signUp(formData);
        dispatch({type: AUTH, data: data})
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}

export const signIn = (formData, navigate) => async (dispatch)=>{

    try {
        const {data} = await api.signIn(formData);
        dispatch({type: AUTH, data: data})
        navigate('/')
    } catch (error) {
        console.log(error)

    }
}