import {API}    from '../../helpers';
import {toast}  from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';

const baseURL = '/administration/user';
const headers = {
	'Content-Type':'application/json',
}

const getUser = createAsyncThunk('user/get',
	async({route,page,totalPage,orderBy,filters},{rejectWithValue})=>{
		try{
            // console.log(route)
			const res = await API({
				requestHeaders:{
					...headers
				}
			}).get(`${baseURL}/${route}`,{
				params:{
					page,
					totalPage,
					orderBy,
					...filters
				}
			})

            if(res.data.data.length > 0){
                return res.data.data[0]
            }
            else{
                toast.error(`Invalid token!`)
                return null
            }

		}
		catch(e){
			if(e.response && e.response.data){
				toast.error(`${e.response.data.message}`)
			}
			return rejectWithValue(e)
		}
	}
)

const signOut = createAsyncThunk('authentication/sign-out',
	async(props,{rejectWithValue})=>{
		try{
			await API({
					requestHeaders:{
						...headers
					}
			})
			.post(`/auth/sign-out`)
		}
		catch(e){
			console.log(e)
			if(e.response && e.response.data){
				toast.error(`${e.response.data.message}`)
			}

			return rejectWithValue(e)
		}
	}
)

export {
    getUser,
    signOut
}