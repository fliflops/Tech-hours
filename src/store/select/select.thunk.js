import {API}    from '../../helpers';
import {toast}  from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';

const baseURL = '/select';
const headers={
    'Content-Type':'application/json',
}

const getSelectData = createAsyncThunk('select/get',
    async({route,type},{rejectWithValue})=>{
        try{

            return await API({
                requestHeaders:{
                    ...headers
                }
            })
            .get(`${baseURL}/${route}/${type}`)
            .then(result => {
                return result.data.data
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

export {
    getSelectData
}