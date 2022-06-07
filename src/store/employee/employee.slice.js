import {createSlice} from '@reduxjs/toolkit';
import {createEmployee,getEmployee} from './employee.thunk';

const initialState = {
    loading:false
}

const slice = createSlice({
    name:'employee',
    initialState,
    reducers:{
        resetAction:()=>initialState
    },
    extraReducers:{
        [createEmployee.fulfilled]:(state,action)=>{
            state.loading=false
        },
        [createEmployee.pending]:(state,action)=>{
            state.loading=true
        },
        [createEmployee.rejected]:(state,action)=>{
            state.loading=false
        },
        [getEmployee.fulfilled]:(state,action)=>{
            state.loading=false
        },
        [getEmployee.pending]:(state,action)=>{
            state.loading=true
        },
        [getEmployee.rejected]:(state,action)=>{
            state.loading=false
        },
    }
})

export default slice.reducer
export {createEmployee,getEmployee}