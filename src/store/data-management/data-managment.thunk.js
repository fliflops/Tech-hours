import {createAsyncThunk} from '@reduxjs/toolkit';
import { API } from '../../helpers';
import {toast}  from 'react-toastify';


const baseURL = '/wbs/data-management';
const headers = {
	'Content-Type':'application/json',
}


export const createData = createAsyncThunk('data-management/create',
async({route,data},{rejectWithValue})=>{
    try{
        return await API({
            requestHeaders:{
                ...headers
            }
        })
        .post(`${baseURL}/${route}`,{data})
        .then(result => {
            toast.success('Success')
            return result.data
        })
    }
    catch(e){
        if(e.response && e.response.data){
            toast.error(`${e.response.data.message}`)
        }
        return rejectWithValue(e)
    }
})

export const getData = createAsyncThunk('data-management/get',
async({route,page,totalPage,orderBy,filters},{rejectWithValue})=>{
    try{
        return await API({
            requestHeaders:{
                ...headers
            }
        })
        .get(`${baseURL}/${route}`,{
            params:{
                page,
                totalPage,
                orderBy,
                ...filters
            }
        })
        .then(result => {
            return result.data
        })

    }
    catch(e){
        if(e.response && e.response.data){
            toast.error(`${e.response.data.message}`)
        }
        return rejectWithValue(e)
    }
})

export const updateData = createAsyncThunk('data-management/update',
async({route,data},{rejectWithValue})=>{
    try{
        return await API({
            requestHeaders:{
                ...headers
            }
        }).put(`${baseURL}/${route}`,{
            data
        })
        .then(result => {
            toast.success('Success')
            return result.data
        })
    }
    catch(e){
        if(e.response && e.response.data){
            toast.error(`${e.response.data.message}`)
        }
        return rejectWithValue(e)
    }
}
)