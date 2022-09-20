import {createAsyncThunk} from '@reduxjs/toolkit';
import { API } from '../../helpers';
import {toast}  from 'react-toastify';


const baseURL = '/wbs/calendar';
const headers = {
	'Content-Type':'application/json',
}

const getCalendar = createAsyncThunk('calendar/get',
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

const createCalendar = createAsyncThunk('calendar/create',
    async({route,data},{rejectWithValue})=>{
        try{

            console.log(data)
            if(!data){
                toast.error('No Data')
                return rejectWithValue({
                    message:'No Data'
                })
            }

            return await API({
                requestHeaders:{
                    ...headers
                }
            })
            .post(`${baseURL}/${route}`,{
                data
            })
            .then(result => {
                toast.success('Success!')
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

export {
    getCalendar,
    createCalendar
}