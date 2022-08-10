import {createSlice} from '@reduxjs/toolkit';
import {getData,createData,updateData} from './work-hours.thunk';

const initialState = {
    loading:false
}

const slice = createSlice({
    name:'work-hours',
    initialState,
    reducers:{
        resetAction:()=>initialState
    },
    extraReducers:{
        [getData.fulfilled]:(state,action)=>{
            state.loading=false
        },
        [getData.pending]:(state,action)=>{
            state.loading=true
        },
        [getData.rejected]:(state,action)=>{
            state.loading=false
        },
        [createData.fulfilled]:(state,action)=>{
            state.loading=false
        },
        [createData.pending]:(state,action)=>{
            state.loading=true
        },
        [createData.rejected]:(state,action)=>{
            state.loading=false
        },
        [updateData.fulfilled]:(state,action)=>{
            state.loading = false
        },
        [updateData.pending]:(state,action)=>{
            state.loading = true
        },
        [updateData.rejected]:(state,action)=>{
            state.loading = false
        }
    }
})

export default slice.reducer
export {getData,createData,updateData};