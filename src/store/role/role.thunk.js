import {createAsyncThunk} from '@reduxjs/toolkit';
import { API } from '../../helpers';
import {toast}  from 'react-toastify';

const baseURL = '/wbs/role';
const headers = {
	'Content-Type':'application/json',
}

const createRole = createAsyncThunk('role/create',
    async({route,data},{rejectWithValue})=> {
        try{
            return await API({
                requestHeaders:{
                    ...headers
                }
            })
            .post(`${baseURL}/${route}`,{
                data
            })
            .then(result => {
                toast.success('Role Created!')
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

const getRole = createAsyncThunk('role/get',
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
    }
)

export {createRole,getRole}
